import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import Sidebar from "./Sidebar";

const Navbar = ({}) => {
    return (
        <AppBar className="Barra" position="static">
            <Toolbar>
                <Sidebar />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Monas Chinas
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
