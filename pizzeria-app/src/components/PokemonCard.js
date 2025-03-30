import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import { Link } from "react-router-dom";


const PokemonCard = ({item}) => {
    return ( <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <Box>
                <img src={item.sprites.front_default} alt="item.name"/>
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    nombre: {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    peso: {item.weight}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Tipo: {item.types[0].type.name}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
                <Link to={`/pokemon/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>

                    <a>Detalles</a>
                </Link>
            </Button>
        </CardActions>
    </Card>);
}


export default PokemonCard;