import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Box,
    Grid,
    CardMedia,
    Container
} from '@mui/material';

const complementos = [
    {
        id: 1,
        nombre: "Nachos",
        descripcion: "Crujientes nachos con queso fundido",
        precio: 50,
        imagen: "/nachos.png"
    },
    {
        id: 2,
        nombre: "Alitas",
        descripcion: "Alitas de pollo con salsa BBQ o Buffalo",
        precio: 80,
        imagen: "/nachos.png"
    },
    {
        id: 3,
        nombre: "Pan de Ajo",
        descripcion: "Pan horneado con mantequilla de ajo y hierbas",
        precio: 30,
        imagen: "/nachos.png"
    }
];

const ComplementoDetails = ({ onAddToCart }) => {
    const [selectedComplemento, setSelectedComplemento] = useState(null);

    const handleAddToCart = (complemento) => {
        const complementoToAdd = {
            tipo: 'complemento',
            id_producto: complemento.id,
            nombre: complemento.nombre,
            descripcion: complemento.descripcion,
            precio: complemento.precio,
            cantidad: 1
        };
        onAddToCart(complementoToAdd);
        setSelectedComplemento(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                    mb: 4, 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#1a1a1a'
                }}
            >
                Selecciona tu Complemento
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
                {complementos.map((complemento) => (
                    <Grid item xs={12} sm={6} md={4} key={complemento.id}>
                        <Card 
                            sx={{ 
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                transform: selectedComplemento?.id === complemento.id ? 'scale(1.05)' : 'scale(1)',
                                border: selectedComplemento?.id === complemento.id ? '3px solid #d32f2f' : 'none',
                                boxShadow: selectedComplemento?.id === complemento.id 
                                    ? '0 8px 16px rgba(211, 47, 47, 0.2)'
                                    : '0 4px 8px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }
                            }}
                            onClick={() => setSelectedComplemento(complemento)}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={complemento.imagen}
                                alt={complemento.nombre}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                <Typography 
                                    variant="h5" 
                                    component="div"
                                    sx={{ 
                                        fontWeight: 'bold',
                                        mb: 1,
                                        color: '#1a1a1a'
                                    }}
                                >
                                    {complemento.nombre}
                                </Typography>
                                <Typography 
                                    variant="body1"
                                    sx={{ 
                                        fontSize: '1rem',
                                        color: '#666',
                                        mb: 2
                                    }}
                                >
                                    {complemento.descripcion}
                                </Typography>
                                <Typography 
                                    variant="h6"
                                    sx={{ 
                                        fontWeight: 'bold',
                                        color: '#d32f2f'
                                    }}
                                >
                                    ${complemento.precio}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedComplemento && (
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 4,
                        mb: 2,
                        backgroundColor: '#d32f2f',
                        padding: '12px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        maxWidth: 400,
                        margin: '32px auto',
                        display: 'block',
                        '&:hover': {
                            backgroundColor: '#9a0007'
                        }
                    }}
                    onClick={() => handleAddToCart(selectedComplemento)}
                >
                    Agregar al Carrito
                </Button>
            )}
        </Container>
    );
};

export default ComplementoDetails; 