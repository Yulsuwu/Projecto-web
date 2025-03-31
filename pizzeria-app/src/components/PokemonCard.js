import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import { Link } from "react-router-dom";


const PokemonCard = ({item}) => {
    return ( <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <Box sx={{
                width: '100%',
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                marginBottom: 2,
            }}>
                <img src={item.sprites.front_default} alt="item.name"
                     style={{
                         objectFit: 'contain',
                         maxWidth: '100%',
                         maxHeight: '100%'
                     }} />
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
        </CardActions>
    </Card>);
}


export default PokemonCard;