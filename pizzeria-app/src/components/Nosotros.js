import {useEffect} from "react";
import {Box, Grid2} from "@mui/material";
import NosotrosCard from "./NosotrosCard";

const Nosotros = () => {

    useEffect(() => {
        document.body.classList.add("nosotros");

    }, []);


    return (

        <div>
            <Box sx={{ flexGrow: 1, marginTop: "15vw",  display: "flex",
                justifyContent: "flex-start",
                paddingLeft: 0,
                marginLeft: 0,
                position: "relative",
            }}>
                <Grid2
                    container
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignContent="center"
                >
                    <Grid2 xs={12} sm={6} md={6} display="flex" justifyContent="center">
                        <NosotrosCard />
                    </Grid2>
                </Grid2>
            </Box>
        </div>
    );
};

export default Nosotros;