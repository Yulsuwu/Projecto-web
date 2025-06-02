import ProductCard from "./ProductCard";
import { Box, Grid } from "@mui/material";

const About = () => {
        const data = {
                count: 4,
                items: [
                        {
                                id: 1,
                                name: "Pizzas",
                                description: "Explora nuestra selección de deliciosas pizzas tradicionales con los mejores ingredientes.",
                                sprites: { front_default: "/pizza.png" },
                        },
                        {
                                id: 2,
                                name: "Pizza Personalizada",
                                description: "Crea tu pizza perfecta eligiendo tus ingredientes favoritos.",
                                sprites: { front_default: "/personalizada.png" },
                        },
                        {
                                id: 3,
                                name: "Bebidas",
                                description: "Refrescantes bebidas para acompañar tu comida.",
                                sprites: { front_default: "/bebida.png" },
                        },
                        {
                                id: 4,
                                name: "Complementos",
                                description: "Deliciosos complementos para hacer tu comida más especial.",
                                sprites: { front_default: "/nachos.png" },
                        },
                ],
        };

        return (
            <Box sx={{ 
                flexGrow: 1,
                padding: 4,
                backgroundColor: 'transparent',
                minHeight: '100vh'
            }}>
                <Grid container spacing={4} justifyContent="center">
                    {data.items.map((item) => (
                        <Grid key={item.id} item xs={12} sm={6} md={3}>
                            <ProductCard item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
};

export default About;