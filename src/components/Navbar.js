import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ user, onLogout }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#d32f2f' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Pizza App
                    </Link>
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                    >
                        Inicio
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/Productos"
                    >
                        Productos
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/Nosotros"
                    >
                        Nosotros
                    </Button>
                    
                    {user ? (
                        <>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: 'white',
                                    mr: 2
                                }}
                            >
                                <PersonIcon sx={{ mr: 1 }} />
                                {user.nombre}
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={onLogout}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <LogoutIcon />
                                Salir
                            </Button>
                        </>
                    ) : (
                        <Button 
                            color="inherit" 
                            component={Link} 
                            to="/usuario"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <PersonIcon />
                            Iniciar Sesión
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
