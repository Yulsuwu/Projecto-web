import {Box, Container} from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children}) => {

    return (

        <div>
            <Box>
                <Navbar/>
                <Container sx={{ minHeight: "20vh"}}>
                    {children}
                </Container>
            </Box>

        </div>

    )};

export default Layout;
