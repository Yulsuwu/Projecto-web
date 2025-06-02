import React, { useState } from "react";
import {Drawer, List, ListItem, ListItemText, IconButton, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer(true)}
                size="large"
                aria-label="menu"
                sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box className="sidebar">
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemText primary="Inicio" />
                        </ListItem>
                        <ListItem button component={Link} to="/Nosotros">
                            <ListItemText primary="Nosotros" />
                        </ListItem>
                        <ListItem button component={Link} to="/Productos">
                            <ListItemText primary="¡Arma tu pedido!" />
                        </ListItem>
                        <ListItem button component={Link} to="/usuario">
                            <ListItemText primary="Iniciar Sesión / Registro" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
