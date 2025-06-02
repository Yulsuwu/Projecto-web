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

const bebidas = [
    {
        id: 1,
        nombre: "Pepsi",
        descripcion: "Refresco Pepsi 600ml",
        precio: 20,
        imagen: "/bebida.png"
    },
    {
        id: 2,
        nombre: "Coca Cola",
        descripcion: "Refresco Coca Cola 600ml",
        precio: 25,
        imagen: "/bebida.png"
    },
    {
        id: 3,
        nombre: "Dr Pepper",
        descripcion: "Refresco Dr Pepper 600ml",
        precio: 22,
        imagen: "/bebida.png"
    }
];

const BebidaDetails = ({ onAddToCart }) => {
    const [selectedBebida, setSelectedBebida] = useState(null);

    const handleAddToCart = (bebida) => {
        const bebidaToAdd = {
            tipo: 'bebida',
            id_producto: bebida.id,
            nombre: bebida.nombre,
            descripcion: bebida.descripcion,
            precio: bebida.precio,
            cantidad: 1
        };
        onAddToCart(bebidaToAdd);
        setSelectedBebida(null);
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
                Selecciona tu Bebida
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
                {bebidas.map((bebida) => (
                    <Grid item xs={12} sm={6} md={4} key={bebida.id}>
                        <Card 
                            sx={{ 
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                transform: selectedBebida?.id === bebida.id ? 'scale(1.05)' : 'scale(1)',
                                border: selectedBebida?.id === bebida.id ? '3px solid #d32f2f' : 'none',
                                boxShadow: selectedBebida?.id === bebida.id 
                                    ? '0 8px 16px rgba(211, 47, 47, 0.2)'
                                    : '0 4px 8px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }
                            }}
                            onClick={() => setSelectedBebida(bebida)}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={bebida.imagen}
                                alt={bebida.nombre}
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
                                    {bebida.nombre}
                                </Typography>
                                <Typography 
                                    variant="body1"
                                    sx={{ 
                                        fontSize: '1rem',
                                        color: '#666',
                                        mb: 2
                                    }}
                                >
                                    {bebida.descripcion}
                                </Typography>
                                <Typography 
                                    variant="h6"
                                    sx={{ 
                                        fontWeight: 'bold',
                                        color: '#d32f2f'
                                    }}
                                >
                                    ${bebida.precio}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedBebida && (
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
                    onClick={() => handleAddToCart(selectedBebida)}
                >
                    Agregar al Carrito
                </Button>
            )}
        </Container>
    );
};

export default BebidaDetails; 