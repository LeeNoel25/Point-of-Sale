import axios from 'axios';
import { useState, useEffect } from 'react';
import { LineItemType } from '../../utilities/type-declaration'
import Checkout from '../../components/Checkout';
import ProductCard from "../../components/ProductCard";
import { SimpleGrid, Flex, Box, Spinner } from "@chakra-ui/react";

const getProducts = async (): Promise<LineItemType[]> => {
  const response = await axios.get("/api/products");
  return response.data;
};

const POS = () => {
  const [lineItems, setLineItems] = useState([] as LineItemType[]);
  const [data, setData] = useState<LineItemType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then((products) => {
      setData(products);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;

  const increaseQuantity = (clickedProduct: LineItemType) => {
    setLineItems(items => {
      const isProductInCart = items.find(product => product._id === clickedProduct._id);

      if (isProductInCart) {
        return items.map(product => product._id === clickedProduct._id ? { ...product, quantity: (product.quantity || 0) + 1 } : product);
      }
      return [...items, { ...clickedProduct, quantity: 1 }];
    });
  };

  const handleReduceQuantity = (id: string) => {
    setLineItems(current =>
      current.map(product => {
        if (product._id === id && product.quantity && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        } else {
          return product;
        }
      })
    );
  };

  const totalItems = lineItems.reduce((cumulated: number, product) => cumulated + (product.quantity || 0), 0);
  const clearCart = () => { setLineItems([]); };

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
          reduceQuantity={handleReduceQuantity}
          totalItems={totalItems}
          clearCart={clearCart}
          removeLineItem={removeLineItem}
        />
      </Box>
    </Flex>
  );

}

export default POS;