import { useState } from 'react';
import { useQuery } from 'react-query';
// import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";
import { LineItemType}  from '../../App'
import Checkout from '../../components/Checkout';
import { SimpleGrid, Flex, Box } from "@chakra-ui/react";

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

    const handleincreaseQuantity = (clickedProduct: LineItemType) => {
        setLineItems(current => {
            // 1. Is the item already added in the cart?
            const isProductInCart = current.find(product => product._id === clickedProduct._id);
      
            if (isProductInCart) {
              return current.map(product =>
                product._id === clickedProduct._id
                  ? { ...product, quantity: product.quantity + 1 }
                  : product
              );
            }
            // First time the item is added
            return [...current, { ...clickedProduct, quantity: 1 }];
          });
        };
    
    const handlereduceQuantity = (id: string) => {    
        setLineItems(prev =>
        prev.reduce((cumulated, product) => {
          if (product._id === id) {
            if (product.quantity === 1) return cumulated;
            return [...cumulated, { ...product, quantity: product.quantity - 1 }];
          } else {
            return [...cumulated, product];
          }
        }, [] as LineItemType[])
      );
    };

    const totalItems = lineItems.reduce((cumulated: number, product) => cumulated + product.quantity, 0);

    return (
        <Flex direction={["column", "row"]} justify="space-between">
          <Box flex="1" pr={["0", "2"]}>
            <SimpleGrid columns={3} spacing="2">
              {data?.map((product: LineItemType) => (
                <ProductCard 
                key={product._id} 
                product={product} 
                handleincreaseQuantity={handleincreaseQuantity} />
              ))}
            </SimpleGrid>
          </Box>
          <Box flex="1" pl={["0", "2"]}>
            <Checkout
              lineItems={lineItems}
              increaseQuantity={handleincreaseQuantity}
              reduceQuantity={handlereduceQuantity}
              totalItems={totalItems}
            />
          </Box>
        </Flex>
      );
}

export default POS;