import React, { useState, useEffect } from 'react';
import { 
    Badge, 
    Fab, 
    Drawer, 
    List, 
    ListItem, 
    ListItemText, 
    Typography, 
    Box, 
    IconButton, 
    Button,
    Snackbar,
    Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import OrderSummary from './OrderSummary';

const CartButton = ({ cartItems = [], onUpdateCart, user }) => {
    const [open, setOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const location = useLocation();
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.cantidad, 0);
        setTotalItems(total);
    }, [cartItems]);

    // No mostrar el carrito en la página de usuario
    if (location.pathname === '/usuario') {
        return null;
    }

    const handleCartOpen = () => {
        setOpen(true);
    };

    const handleCartClose = () => {
        setOpen(false);
    };

    const handleDeleteItem = (index) => {
        const newItems = cartItems.filter((_, i) => i !== index);
        onUpdateCart(newItems);
        setNotificationMessage('Producto eliminado del carrito');
        setShowNotification(true);
    };

    const handleCheckout = () => {
        setOpen(false);
        setShowOrderSummary(true);
    };

    const handleConfirmOrder = () => {
        setShowOrderSummary(false);
        setNotificationMessage('¡Pedido realizado con éxito!');
        setShowNotification(true);
        onUpdateCart([]); // Vaciar el carrito después de confirmar el pedido
    };

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotification(false);
    };

    return (
        <>
            <Fab 
                color="primary" 
                aria-label="cart"
                onClick={handleCartOpen}
                sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    backgroundColor: '#d32f2f',
                    '&:hover': {
                        backgroundColor: '#9a0007'
                    },
                    zIndex: 1000
                }}
            >
                <Badge badgeContent={totalItems} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </Fab>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleCartClose}
            >
                <Box sx={{ width: 350, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Carrito de Compras</Typography>
                        <IconButton onClick={handleCartClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {cartItems.length === 0 ? (
                        <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
                            Tu carrito está vacío
                        </Typography>
                    ) : (
                        <>
                            <List>
                                {cartItems.map((item, index) => (
                                    <ListItem 
                                        key={index} 
                                        divider
                                        secondaryAction={
                                            <IconButton 
                                                edge="end" 
                                                aria-label="delete"
                                                onClick={() => handleDeleteItem(index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={item.nombre}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        Cantidad: {item.cantidad}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2">
                                                        ${item.precio} c/u
                                                    </Typography>
                                                </>
                                            }
                                        />
                                        <Typography variant="body1" sx={{ ml: 2 }}>
                                            ${item.precio * item.cantidad}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Total: ${cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0)}
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCheckout}
                                    sx={{
                                        backgroundColor: '#d32f2f',
                                        '&:hover': {
                                            backgroundColor: '#9a0007'
                                        }
                                    }}
                                >
                                    Proceder al pago
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>

            <OrderSummary
                open={showOrderSummary}
                onClose={() => setShowOrderSummary(false)}
                cartItems={cartItems}
                user={user}
                onConfirmOrder={handleConfirmOrder}
            />

            <Snackbar
                open={showNotification}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert 
                    onClose={handleCloseNotification} 
                    severity="success" 
                    sx={{ width: '100%' }}
                >
                    {notificationMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CartButton; 