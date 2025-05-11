import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const CarritoCard = ({ carrito }) => {
    return (
        <Card sx={{ maxWidth: 400, margin: 'auto' }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Carrito</Typography>
                <List>
                    {carrito.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item.nombre} secondary={`$${item.precio}`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default CarritoCard;
