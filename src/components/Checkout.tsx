import { LineItemType}  from '../App'
import LineItem from './LineItem';
import { Box, Grid, Button, Text, Heading, useToast } from "@chakra-ui/react";
import axios from 'axios';

type Props = {
    lineItems: LineItemType[];
    increaseQuantity: (clickedProduct: LineItemType) => void;
    reduceQuantity: (id: string) => void;
    totalItems: number;
    clearCart: () => void;
    removeLineItem: (clickedProduct: LineItemType) => void;
};

const Cart: React.FC<Props> = ({ lineItems, increaseQuantity, reduceQuantity, clearCart, removeLineItem }) => {

  const toast = useToast();

  const calculateTotal = (product: LineItemType[]) =>
    product.reduce((current: number, product) => current + product.quantity * product.price, 0);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const total = calculateTotal(lineItems);

    axios.post(`/api/sale`, { items: lineItems, total })
    .then((response) => {
        console.log(response);

        clearCart();
        toast({
          title: "Sale Successful.",
          description: "Your sale was successful.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Sale Unsuccessful.",
          description: "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box bg="white" boxShadow="base" p={5} borderRadius="md">
      <Heading size="lg" mb={5}>Shopping Cart ({lineItems.length} items)</Heading>
      {lineItems.length === 0 ? <Text>No items in cart.</Text> : (
        <>
          <Grid templateColumns="repeat(5, 1fr)" gap={6} alignItems="center" mb={5}>
            <Text fontWeight="bold">Name</Text>
            <Text fontWeight="bold">Quantity</Text>
            <Text fontWeight="bold">Price</Text>
            <Text fontWeight="bold">Total</Text>
          </Grid>
          {lineItems.map(product => (
            <LineItem
              key={product._id}
              product={product}
              increaseQuantity={increaseQuantity}
              reduceQuantity={reduceQuantity}
              removeLineItem={removeLineItem}
            />
          ))}
          <Heading size="md" mt={5}>Total: ${calculateTotal(lineItems).toFixed(2)}</Heading>
          <Button colorScheme="teal" onClick={handleSubmit} mt={5}>Create Sale</Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
