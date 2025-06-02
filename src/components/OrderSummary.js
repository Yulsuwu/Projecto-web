import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Alert,
    useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ open, onClose, cartItems, user, onConfirmOrder }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const handleProceedToPayment = () => {
        if (!user) {
            navigate('/usuario');
            onClose();
            return;
        }
        onConfirmOrder();
    };

    const subtotal = calculateSubtotal();
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }
            }}
        >
            <DialogTitle 
                sx={{ 
                    textAlign: 'center',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    py: 2
                }}
            >
                Resumen del Pedido
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                {!user ? (
                    <Alert 
                        severity="warning" 
                        sx={{ mb: 2 }}
                    >
                        Debes iniciar sesión para completar tu pedido
                    </Alert>
                ) : (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Información del Cliente
                        </Typography>
                        <Typography variant="body1">
                            ID Usuario: {user.id}
                        </Typography>
                        <Typography variant="body1">
                            Nombre: {user.nombre}
                        </Typography>
                        <Typography variant="body1">
                            Dirección: {user.direccion}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Productos
                </Typography>
                <List>
                    {cartItems.map((item, index) => (
                        <ListItem key={index} sx={{ py: 1 }}>
                            <ListItemText
                                primary={item.nombre}
                                secondary={
                                    <Typography variant="body2" color="text.secondary">
                                        {item.descripcion}
                                        {item.tamaño && ` - ${item.tamaño}`}
                                    </Typography>
                                }
                            />
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {item.cantidad} x ${item.precio}
                                </Typography>
                                <Typography variant="body1">
                                    ${item.precio * item.cantidad}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">IVA (16%):</Typography>
                        <Typography variant="body1">${iva.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6" color="primary">
                            ${total.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button 
                    onClick={onClose}
                    variant="outlined"
                    sx={{ 
                        borderColor: '#d32f2f',
                        color: '#d32f2f',
                        '&:hover': {
                            borderColor: '#9a0007',
                            backgroundColor: 'rgba(211, 47, 47, 0.04)'
                        }
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleProceedToPayment}
                    variant="contained"
                    sx={{
                        backgroundColor: '#d32f2f',
                        '&:hover': {
                            backgroundColor: '#9a0007'
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)'
                        }
                    }}
                >
                    {user ? 'Confirmar Pedido' : 'Iniciar Sesión'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderSummary; 