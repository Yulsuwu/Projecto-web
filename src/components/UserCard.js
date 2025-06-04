import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Alert,
    Snackbar,
    Tabs,
    Tab,
    CircularProgress,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Configuración del backend
const API_BASE_URL = 'http://localhost:8080'; // Ajusta este puerto según tu configuración de Spring Boot

const UserCard = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        direccion: {
            id_direccion: '',
            coordenadas: ''
        },
        tarjeta: {
            numero_tarjeta: '',
            nombre_titular: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!isLogin) {
            try {
                // 1. Primero crear la tarjeta
                const tarjetaData = {
                    numero_tarjeta: parseInt(formData.tarjeta.numero_tarjeta),
                    nombre_titular: formData.nombre
                };

                console.log('Creando tarjeta:', tarjetaData);
                const tarjetaResponse = await fetch(`${API_BASE_URL}/api/tarjetas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Origin': 'http://localhost:3000'
                    },
                    credentials: 'include',
                    body: JSON.stringify(tarjetaData)
                });

                if (!tarjetaResponse.ok) {
                    if (tarjetaResponse.status === 403) {
                        throw new Error('No tienes permiso para crear una tarjeta. Por favor, contacta al administrador.');
                    }
                    const tarjetaError = await tarjetaResponse.text();
                    throw new Error(`Error al crear la tarjeta: ${tarjetaError || 'Error desconocido'}`);
                }

                const tarjetaCreada = await tarjetaResponse.json();
                console.log('Tarjeta creada:', tarjetaCreada);

                // 2. Verificar que la dirección existe
                const direccionResponse = await fetch(`${API_BASE_URL}/api/direcciones/${formData.direccion.id_direccion}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Origin': 'http://localhost:3000'
                    },
                    credentials: 'include'
                });

                if (!direccionResponse.ok) {
                    if (direccionResponse.status === 403) {
                        throw new Error('No tienes permiso para verificar la dirección. Por favor, contacta al administrador.');
                    }
                    throw new Error('La dirección especificada no existe o no se puede acceder a ella');
                }

                const direccionExistente = await direccionResponse.json();
                console.log('Dirección encontrada:', direccionExistente);

                // 3. Registrar el usuario
                const registerData = {
                    email: formData.email,
                    password: formData.password,
                    nombre: formData.nombre,
                    apellido_paterno: formData.apellido_paterno,
                    apellido_materno: formData.apellido_materno,
                    telefono: formData.telefono,
                    direccion: {
                        id_direccion: parseInt(formData.direccion.id_direccion),
                        coordenadas: direccionExistente.coordenadas
                    },
                    tarjeta: {
                        numero_tarjeta: parseInt(formData.tarjeta.numero_tarjeta),
                        nombre_titular: formData.nombre
                    }
                };

                console.log('Registrando usuario:', registerData);
                const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Origin': 'http://localhost:3000'
                    },
                    credentials: 'include',
                    body: JSON.stringify(registerData)
                });

                if (!registerResponse.ok) {
                    if (registerResponse.status === 403) {
                        throw new Error('No tienes permiso para registrar un usuario. Por favor, contacta al administrador.');
                    }
                    const registerError = await registerResponse.text();
                    throw new Error(`Error en el registro: ${registerError || 'Error desconocido'}`);
                }

                const data = await registerResponse.json();
                localStorage.setItem('token', data.token);
                setSuccess('Registro exitoso');
                setTimeout(() => {
                    navigate('/');
                }, 1500);

            } catch (err) {
                console.error('Error durante el registro:', err);
                setError(err.message || 'Error durante el proceso de registro');
            }
        } else {
            // Proceso de login
            try {
                const loginData = {
                    email: formData.email,
                    password: formData.password
                };

                console.log('Iniciando sesión:', loginData);
                const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Origin': 'http://localhost:3000'
                    },
                    credentials: 'include',
                    body: JSON.stringify(loginData)
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        throw new Error('No tienes permiso para iniciar sesión. Por favor, contacta al administrador.');
                    }
                    const loginError = await response.text();
                    throw new Error(`Error en el inicio de sesión: ${loginError || 'Credenciales incorrectas'}`);
                }

                const data = await response.json();
                localStorage.setItem('token', data.token);
                setSuccess('Inicio de sesión exitoso');
                if (onLogin) {
                    onLogin(data);
                }
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (err) {
                console.error('Error de conexión:', err);
                setError(err.message || 'Error de conexión con el servidor');
            }
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card
                sx={{
                    maxWidth: 600,
                    margin: 'auto',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    borderRadius: 2
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{
                            textAlign: 'center',
                            color: '#1a1a1a',
                            fontWeight: 'bold',
                            mb: 3
                        }}
                    >
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </Typography>

                    <Tabs
                        value={isLogin ? 0 : 1}
                        onChange={(_, newValue) => setIsLogin(!newValue)}
                        centered
                        sx={{ mb: 3 }}
                    >
                        <Tab label="Iniciar Sesión" />
                        <Tab label="Registrarse" />
                    </Tabs>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="password"
                            label="Contraseña"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />

                        {!isLogin && (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="nombre"
                                            label="Nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="apellido_paterno"
                                            label="Apellido Paterno"
                                            value={formData.apellido_paterno}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="apellido_materno"
                                            label="Apellido Materno"
                                            value={formData.apellido_materno}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="telefono"
                                            label="Teléfono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            name="direccion.id_direccion"
                                            label="ID Dirección"
                                            type="number"
                                            value={formData.direccion.id_direccion}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="direccion.coordenadas"
                                            label="Coordenadas"
                                            value={formData.direccion.coordenadas}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            name="tarjeta.numero_tarjeta"
                                            label="Número de Tarjeta"
                                            type="number"
                                            value={formData.tarjeta.numero_tarjeta}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="tarjeta.nombre_titular"
                                            label="Nombre del Titular"
                                            value={formData.tarjeta.nombre_titular}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#d32f2f',
                                padding: '12px',
                                fontSize: '1.1rem',
                                '&:hover': {
                                    backgroundColor: '#9a0007'
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                isLogin ? 'Iniciar Sesión' : 'Registrarse'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Snackbar
                open={!!error || !!success}
                autoHideDuration={6000}
                onClose={() => {
                    setError('');
                    setSuccess('');
                }}
            >
                <Alert
                    severity={error ? "error" : "success"}
                    sx={{ width: '100%' }}
                >
                    {error || success}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UserCard;