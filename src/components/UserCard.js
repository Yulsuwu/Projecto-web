import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    Snackbar,
    Tabs,
    Tab,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        direccion: '',
        telefono: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/usuarios';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(isLogin ? {
                    email: formData.email,
                    password: formData.password
                } : {
                    email: formData.email,
                    password: formData.password,
                    nombre: formData.nombre,
                    apellido_paterno: formData.apellido_paterno,
                    apellido_materno: formData.apellido_materno,
                    direccion: formData.direccion,
                    telefono: formData.telefono
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso');
                if (isLogin && onLogin) {
                    onLogin(data);
                }
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setError(data.message || (isLogin ? 'Credenciales incorrectas' : 'Error en el registro'));
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
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
                                <TextField
                                    name="nombre"
                                    label="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    name="apellido_paterno"
                                    label="Apellido Paterno"
                                    value={formData.apellido_paterno}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    name="apellido_materno"
                                    label="Apellido Materno"
                                    value={formData.apellido_materno}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    name="direccion"
                                    label="Dirección"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
                                <TextField
                                    name="telefono"
                                    label="Teléfono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    margin="normal"
                                />
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