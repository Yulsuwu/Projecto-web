import {Card, CardContent, Typography, Button, CardMedia} from '@mui/material';

const ComplementoCard = ({ complemento, onAdd }) => {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardMedia
                component="img"
                height="160"
                image={nachos.imagen}
                alt={nachos.nombre}
            />
            <CardContent>
                <Typography variant="h6">{complemento.nombre}</Typography>
                <Typography variant="body2">{complemento.descripcion}</Typography>
                <Typography variant="body1" fontWeight="bold">${complemento.precio}</Typography>
                <Button variant="outlined" onClick={() => onAdd(complemento)} sx={{ mt: 1 }}>
                    Agregar
                </Button>
            </CardContent>
        </Card>
    );
};

export default ComplementoCard;
