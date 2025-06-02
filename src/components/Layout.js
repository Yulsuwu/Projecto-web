import {Box, Container} from "@mui/material";
import Navbar from "./Navbar";
import CartButton from "./CartButton";

const Layout = ({ children, cartItems, onUpdateCart, user, onLogout }) => {
    return (
        <div>
            <Box>
                <Navbar user={user} onLogout={onLogout} />
                <CartButton 
                    cartItems={cartItems} 
                    onUpdateCart={onUpdateCart}
                    user={user}
                />
                <Container sx={{ minHeight: "20vh"}}>
                    {children}
                </Container>
            </Box>
        </div>
    );
};

export default Layout;
