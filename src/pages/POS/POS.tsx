import { useState } from 'react';
import { useQuery } from 'react-query';
// import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";
import { LineItemType}  from '../../App'

import { Grid, GridItem,SimpleGrid, Box } from "@chakra-ui/react";

const getProducts = async (): Promise<LineItemType[]> =>
    await (await fetch("/api/products")).json();

const POS = () => {
    const [lineItems, setLineItems] = useState([] as LineItemType[]);
    const { data, isLoading } = useQuery<LineItemType[]>(
      'products',
      getProducts
    );
    console.log(data);
    if (isLoading) return <div>Loading...</div>;

    const handleAddToCart = (clickedItem: LineItemType) => {
      };

return (
      <Grid
          templateAreas={{
          lg: `"nav" "products sales"`, 
      }}
      templateColumns={{
          lg: "200px 1fr",
      }}
    >
      <Box>
      <GridItem area="products">
          <SimpleGrid columns={3}>
            {data?.map((product: LineItemType) => (
                <ProductCard product={product} handleAddToCart={handleAddToCart} />
            ))}
          </SimpleGrid>
      </GridItem>
      </Box>
      <GridItem area="sales">
      Sales
      </GridItem>
    </Grid>
    );
}

export default POS;