import { Card, CardContent, Typography, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const PizzaPersonalizadaCard = ({ ingredientes, onSeleccionar, onConfirmar }) => {
    return (
        <Card sx={{ maxWidth: 400, padding: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Arma tu pizza</Typography>
                <FormGroup>
                    {ingredientes.map((ing, index) => (
                        <FormControlLabel
                            control={<Checkbox onChange={() => onSeleccionar(ing)} />}
                            label={ing}
                            key={index}
                        />
                    ))}
                </FormGroup>
                <Button variant="contained" sx={{ mt: 2 }} onClick={onConfirmar}>
                    Confirmar Pizza
                </Button>
            </CardContent>
        </Card>
    );
};

export default PizzaPersonalizadaCard;
