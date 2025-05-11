import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const PizzaCard = ({ pizza, onAdd }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={pizza.imagen}
                alt={pizza.nombre}
            />
            <CardContent>
                <Typography variant="h6">{pizza.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {pizza.descripcion}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    ${pizza.precio}
                </Typography>
                <Button onClick={() => onAdd(pizza)} variant="contained" sx={{ mt: 2 }}>
                    Agregar
                </Button>
            </CardContent>
        </Card>
    );
};

export default PizzaCard;
