import {Box, Container} from "@mui/material";
import Navbar from "./Navbar";


const Layout = ({ children }) =>{
    return (
        <Box className = {"Container"}>
            <Navbar />
            <Container>
                { children }
            </Container>
            <Box className ="footer">
                Todos los derechos reservados
            </Box>
        </Box>
    )
};

export default Layout;
