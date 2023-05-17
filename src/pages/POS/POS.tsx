import { useState } from 'react';
import { useQuery } from 'react-query';
// import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { LineItemType}  from '../../utilities/type-declaration'
import Checkout from '../../components/Checkout';
import { SimpleGrid, Flex, Box } from "@chakra-ui/react";

const getProducts = async (): Promise<LineItemType[]> =>
  (await fetch("/api/products")).json();

const POS = () => {
    const [lineItems, setLineItems] = useState([] as LineItemType[]);
    const { data, isLoading } = useQuery<LineItemType[]>(
      'products',
      getProducts
    );
    console.log(data);
    if (isLoading) return <div>Loading...</div>;

    const increaseQuantity = (clickedProduct: LineItemType) => {
        setLineItems(current => {
            const isProductInCart = current.find(product => product._id === clickedProduct._id);
      
            if (isProductInCart) {
              return current.map(product =>
                product._id === clickedProduct._id
                  ? { ...product, quantity: (product.quantity || 0) + 1 }
                  : product
              );
            }
            return [...current, { ...clickedProduct, quantity: 1 }];
          });
        };
    
    const handlereduceQuantity = (id: string) => {    
        setLineItems(prev =>
        prev.reduce((cumulated, product) => {
          if (product._id === id) {
            if (product.quantity === 1) return cumulated;
            return [...cumulated, { ...product, quantity: (product.quantity || 0) - 1 }];
          } else {
            return [...cumulated, product];
          }
        }, [] as LineItemType[])
      );
    };

    const totalItems = lineItems.reduce((cumulated: number, product) => cumulated + (product.quantity || 0), 0);
    const clearCart = () => {
      setLineItems([]);
    };

    const removeLineItem = (clickedProduct: LineItemType) => {
      setLineItems(prevItems => prevItems.filter(item => item._id !== clickedProduct._id));
  };

    return (
      <Flex direction={["column", "row"]} mt={20}>
        <Box flex="1" pr={5}>
          <SimpleGrid columns={[1, null, 2, 4]} spacing={10}>
            {data?.map((product: LineItemType) => (
              <ProductCard
                key={product._id}
                product={product}
                increaseQuantity={increaseQuantity}
              />
            ))}
          </SimpleGrid>
        </Box>
        <Box flex="1" pl={5}>
          <Checkout
            lineItems={lineItems}
            increaseQuantity={increaseQuantity}
            reduceQuantity={handlereduceQuantity}
            totalItems={totalItems}
            clearCart={clearCart}
            removeLineItem={removeLineItem}
          />
        </Box>
      </Flex>
    );
    
}

export default POS;