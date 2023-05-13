import { Grid, GridItem, Box } from "@chakra-ui/react";
// import { useEffect, useState } from "react";


const POS = () => {
return(
    <Grid
        templateAreas={{
        lg: `"nav" "fruits sales"`, 
    }}
    templateColumns={{
        lg: "200px 1fr",
    }}
>
    <Box>
    <GridItem area="fruits">
        Fruits
    </GridItem>
    </Box>
    <GridItem area="sales">
    Sales
    </GridItem>
    </Grid>
    )
}

export default POS;