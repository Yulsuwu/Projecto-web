import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";

const NosotrosCard = () => {
    return (
        <Card sx={{ maxWidth: 500,
            backgroundColor: "transparent",
            boxShadow: "none"}}>
        <CardActionArea>
            <Box sx={{
                backgroundColor: "#920f0f",
                padding: "10px",
                marginBottom: "16px",
                display: "inline-block",
                textAlign: "center",
                lineHeight: "50px",
                borderRadius: "25px",
                height: "10dpx",
                minWidth: "150px",
            }}>
                <Typography gutterBottom variant="h2" component="div" sx={{ color: 'white' }}>
                    ¿Quiénes somos?
                </Typography>
            </Box>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textAlign: "center"}}>
                    Bienvenidos a Pizzas Los Desterrados, donde cada rebanada es un acto de resistencia contra lo ordinario.
                    Nuestra cocina no sigue recetas comunes; aquí, forjamos sabores con la misma determinación con
                    la que un verdadero líder enfrenta la adversidad.
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textAlign: "center"}}>
                    Usamos ingredientes seleccionados con precisión militar:
                    masas de fermentación lenta para una textura perfecta, quesos de calidad suprema y salsas elaboradas
                    con tomates cuidadosamente sazonados.
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', fontStyle: 'italic', textAlign: "center"}}>
                    El resultado es una pizza con carácter, robusta y llena de intensidad, lista para conquistar cualquier apetito.
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    );
}

export default NosotrosCard;