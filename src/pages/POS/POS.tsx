import { useState, useEffect } from 'react';
import { ProductType } from '../../utilities/type-declaration'
import Checkout from '../../components/Checkout';
import ProductCard from "../../components/ProductCard";
import { SimpleGrid, Flex, Box, Spinner } from "@chakra-ui/react";
import axios from 'axios';

const getProducts = async (): Promise<ProductType[]> => {
  const response = await axios.get("/api/products");
  return response.data;
};

const POS = () => {
  const [data, setData] = useState<ProductType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((products) => {
      setData(products);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Flex direction={["column", "row"]} mt={20}>
      <Box flex="1" pr={5}>
        <SimpleGrid columns={[1, null, 2, 4]} spacing={10}>
          {data?.map((product: ProductType) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Box flex="1" pl={5}>
        <Checkout />
      </Box>
    </Flex>
  );
}

export default POS;