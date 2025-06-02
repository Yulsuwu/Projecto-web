import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        switch(item.name) {
            case "Pizzas":
                navigate('/pizzas');
                break;
            case "Bebidas":
                navigate('/bebidas');
                break;
            case "Complementos":
                navigate('/complementos');
                break;
            case "Pizza Personalizada":
                navigate('/pizza-personalizada');
                break;
            default:
                break;
        }
    };

    return (
        <Card 
            sx={{ 
                maxWidth: 345, 
                m: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                    cursor: 'pointer'
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
            onClick={handleClick}
        >
            <CardMedia
                component="img"
                height="200"
                image={item.sprites.front_default}
                alt={item.name}
                sx={{
                    objectFit: 'cover'
                }}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {item.description}
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    sx={{
                        mt: 'auto',
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                            backgroundColor: '#9a0007'
                        }
                    }}
                >
                    Ver opciones
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard; 