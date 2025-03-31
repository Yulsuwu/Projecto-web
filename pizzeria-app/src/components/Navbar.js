import {AppBar, Toolbar, Typography} from "@mui/material";
import Sidebar from "./Sidebar";

const Navbar = ({}) => {
    return (
        <AppBar className="Barra" position="static" sx={{ backgroundColor: "transparent", boxShadow: "none", zIndex: 10}}>
            <Toolbar>
                <Sidebar />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color={"white"}>
                    Menú
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
