import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const BebidaCard = ({ bebida, onAdd }) => {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                height="160"
                image={bebida.imagen}
                alt={bebida.nombre}
            />
            <CardContent>
                <Typography variant="h6">{bebida.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    ${bebida.precio}
                </Typography>
                <Button variant="outlined" onClick={() => onAdd(bebida)} sx={{ mt: 1 }}>
                    Agregar
                </Button>
            </CardContent>
        </Card>
    );
};

export default BebidaCard;
