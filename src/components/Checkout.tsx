import { ProductType } from '../utilities/type-declaration'
import CartItem from './CartItem';
import { Box, Grid, Button, Text, Heading, useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useCart } from './CartContext';

const Cart: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const toast = useToast();

  const calculateTotal = (products: ProductType[]) =>
    products.reduce((currentPrice: number, product) => currentPrice + (product.quantity || 0) * product.price, 0);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const total = calculateTotal(cartItems);

    axios.post(`/api/sale`, { items: cartItems, total })
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
      <Heading size="lg" mb={5}>Shopping Cart ({cartItems.length} items)</Heading>
      {cartItems.length === 0 ? <Text>No items in cart.</Text> : (
        <>
          <Grid templateColumns="repeat(5, 1fr)" gap={6} alignItems="center" mb={5}>
            <Text fontWeight="bold">Name</Text>
            <Text fontWeight="bold">Quantity</Text>
            <Text fontWeight="bold">Price</Text>
            <Text fontWeight="bold">Total</Text>
          </Grid>
          {cartItems.map(product => (
            <CartItem
              key={product._id}
              product={product}
            />
          ))}
          <Heading size="md" mt={5}>Total: ${calculateTotal(cartItems).toFixed(2)}</Heading>
          <Button colorScheme="teal" onClick={handleSubmit} mt={5}>Create Sale</Button>
        </>
      )}
    </Box>
  );
};

export default Cart;