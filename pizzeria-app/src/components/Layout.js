import {Box, Container, Typography} from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children}) => {

    return (

        <div>
            <Box>
                <Navbar/>
                <Container sx={{ minHeight: "calc(100vh - 80px)" }}>
                    {children}
                </Container>
            </Box>

            <Box sx={{mt: 5}}>
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    ©2025. Todos los derechos reservados.
                </Typography>
            </Box>
        </div>

    )};

export default Layout;
