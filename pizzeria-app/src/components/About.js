import PokemonCard from "./PokemonCard";
import { Box, Grid, Paper, styled } from "@mui/material";

const About = () => {
        const data = {
                count: 3,
                items: [
                        {
                                id: 1,
                                name: "Pizzas",
                                description: "Deliciosa pizza de pepperoni con queso derretido.",
                                sprites: { front_default: "/pizza.png" },
                        },
                        {
                                id: 2,
                                name: "Bebidas",
                                description: "Refresco de cola clásico y refrescante.",
                                sprites: { front_default: "/bebida.png" },
                        },
                        {
                                id: 3,
                                name: "Complementos",
                                description: "Crujientes papas fritas con sal y especias.",
                                sprites: { front_default: "/nachos.png" },
                        },
                ],
        };

        const Item = styled(Paper)(({ theme }) => ({
                backgroundColor: '#fff',
                ...theme.typography.body2,
                padding: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary,
        }));

        return (
            <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} justifyContent="center">
                            {data.items.map((item) => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} display="flex" justifyContent="center">
                                        <Item>
                                                <PokemonCard item={item} />
                                        </Item>
                                </Grid>
                            ))}
                    </Grid>
            </Box>
        );
};

export default About;