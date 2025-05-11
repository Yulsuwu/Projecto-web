import { Card, CardContent, Typography, Divider } from '@mui/material';

const TicketCard = ({ items, total }) => {
    return (
        <Card sx={{ maxWidth: 400, marginTop: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Resumen de compra</Typography>
                {items.map((item, index) => (
                    <Typography key={index} variant="body2">
                        {item.nombre} - ${item.precio}
                    </Typography>
                ))}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Total: ${total}</Typography>
            </CardContent>
        </Card>
    );
};

export default TicketCard;
