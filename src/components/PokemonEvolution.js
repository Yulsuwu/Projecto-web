import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PokemonEvolution = ({ pokemon }) => {
    return (
        <Card sx={{ maxWidth: 200, textAlign: "center" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="120"
                    image={pokemon.sprites.front_default}
                    alt={pokemon.name}
                />
                <CardContent>
                    <Typography variant="h6">{pokemon.name.toUpperCase()}</Typography>
                    <Button variant="contained" size="small" color="primary">
                        <Link to={`/pokemon/${pokemon.id}`} style={{ color: "white", textDecoration: "none" }}>
                            Ver Detalles
                        </Link>
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PokemonEvolution;;
