import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    FormControl, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    Button, 
    Box,
    Grid,
    CardMedia,
    Container
} from '@mui/material';

const ingredientes = [
    {
        id: 1,
        nombre: "Pepperoni",
        descripcion: "Deliciosas rodajas de pepperoni",
        imagen: "/personalizada.png"
    },
    {
        id: 2,
        nombre: "Queso Extra",
        descripcion: "Queso mozzarella adicional",
        imagen: "/personalizada.png"
    },
    {
        id: 3,
        nombre: "Jamón",
        descripcion: "Trozos de jamón",
        imagen: "/personalizada.png"
    }
];

const tamaños = [
    { tamaño: "Pequeña", precio: 100 },
    { tamaño: "Mediana", precio: 180 },
    { tamaño: "Grande", precio: 250 }
];

const PizzaPersonalizadaDetails = ({ onAddToCart }) => {
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleAddToCart = () => {
        if (selectedIngredient && selectedSize) {
            const pizzaToAdd = {
                tipo: 'pizza_personalizada',
                id_producto: selectedIngredient.id,
                nombre: `Pizza Personalizada con ${selectedIngredient.nombre}`,
                descripcion: `Pizza ${selectedSize.tamaño} con ${selectedIngredient.nombre}`,
                ingrediente: selectedIngredient.nombre,
                tamaño: selectedSize.tamaño,
                precio: selectedSize.precio,
                cantidad: 1
            };
            onAddToCart(pizzaToAdd);
            setSelectedIngredient(null);
            setSelectedSize(null);
        }
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
                Personaliza tu Pizza
            </Typography>
            
            <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                    textAlign: 'center',
                    color: '#333',
                    mb: 3
                }}
            >
                1. Selecciona un ingrediente especial
            </Typography>
            
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
                {ingredientes.map((ingrediente) => (
                    <Grid item xs={12} sm={6} md={4} key={ingrediente.id}>
                        <Card 
                            sx={{ 
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                transform: selectedIngredient?.id === ingrediente.id ? 'scale(1.05)' : 'scale(1)',
                                border: selectedIngredient?.id === ingrediente.id ? '3px solid #d32f2f' : 'none',
                                boxShadow: selectedIngredient?.id === ingrediente.id 
                                    ? '0 8px 16px rgba(211, 47, 47, 0.2)'
                                    : '0 4px 8px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                }
                            }}
                            onClick={() => setSelectedIngredient(ingrediente)}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={ingrediente.imagen}
                                alt={ingrediente.nombre}
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
                                    {ingrediente.nombre}
                                </Typography>
                                <Typography 
                                    variant="body1"
                                    sx={{ 
                                        fontSize: '1rem',
                                        color: '#666'
                                    }}
                                >
                                    {ingrediente.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedIngredient && (
                <Box 
                    sx={{ 
                        mt: 6, 
                        textAlign: 'center',
                        backgroundColor: '#f8f8f8',
                        borderRadius: 2,
                        p: 4,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 'bold',
                            color: '#1a1a1a',
                            mb: 3
                        }}
                    >
                        2. Selecciona el tamaño
                    </Typography>
                    <FormControl component="fieldset" sx={{ width: '100%', maxWidth: 400 }}>
                        <RadioGroup
                            value={selectedSize ? JSON.stringify(selectedSize) : ''}
                            onChange={(e) => setSelectedSize(JSON.parse(e.target.value))}
                        >
                            {tamaños.map((tamaño) => (
                                <FormControlLabel
                                    key={tamaño.tamaño}
                                    value={JSON.stringify(tamaño)}
                                    control={
                                        <Radio 
                                            sx={{
                                                color: '#d32f2f',
                                                '&.Mui-checked': {
                                                    color: '#d32f2f',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography 
                                            variant="h6"
                                            sx={{ 
                                                color: '#333',
                                                fontWeight: selectedSize?.tamaño === tamaño.tamaño ? 'bold' : 'normal'
                                            }}
                                        >
                                            {tamaño.tamaño} - ${tamaño.precio}
                                        </Typography>
                                    }
                                    sx={{
                                        margin: '10px 0',
                                        backgroundColor: selectedSize?.tamaño === tamaño.tamaño ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                                        borderRadius: 1,
                                        padding: '8px 16px',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'rgba(211, 47, 47, 0.05)'
                                        }
                                    }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            )}

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
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)'
                    }
                }}
                disabled={!selectedIngredient || !selectedSize}
                onClick={handleAddToCart}
            >
                Agregar al Carrito
            </Button>
        </Container>
    );
};

export default PizzaPersonalizadaDetails; 