import {Box, Container, Typography} from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children}) => {

    return (

        <div>
            <Box>
                <Navbar/>
                <Container>
                    {children}
                </Container>
            </Box>

            <Box>
                <Typography variant="h4" component="h1" sx={{mb: 2}}>
                    Derechos Reservados
                </Typography>
            </Box>
        </div>

    )};

export default Layout;
