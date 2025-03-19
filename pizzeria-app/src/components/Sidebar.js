import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);


    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>


            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
                    <List>

                        <ListItem button component={Link} to="/">
                            <ListItemText primary="Inicio" />
                        </ListItem>
                        <ListItem button component={Link} to="/About">
                            <ListItemText primary="About" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>


        </>
    );
};

export default Sidebar;
