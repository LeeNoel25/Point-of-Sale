import { LineItemType}  from '../App'
import LineItem from './LineItem';
import { Box, Grid, GridItem } from "@chakra-ui/react";

type Props = {
    lineItems: LineItemType[];
    increaseQuantity: (clickedProduct: LineItemType) => void;
    reduceQuantity: (id: string) => void;
    totalItems: number;
};

const Cart: React.FC<Props> = ({ lineItems, increaseQuantity, reduceQuantity, totalItems }) => {
  const calculateTotal = (product: LineItemType[]) =>
    product.reduce((ack: number, product) => ack + product.quantity * product.price, 0);

  return (
    <Box>
      <h2>Shopping Cart ({totalItems} items)</h2>
      {lineItems.length === 0 ? <p>No items in cart.</p> : null}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} alignItems="center">
        <GridItem><h3>Name</h3></GridItem>
        <GridItem><h3>Quantity</h3></GridItem>
         <GridItem><h3>Price</h3></GridItem>
        <GridItem><h3>Total</h3></GridItem>
      </Grid>
      {lineItems.map(product => (
        <LineItem
          key={product._id}
          product={product}
          increaseQuantity={increaseQuantity}
          reduceQuantity={reduceQuantity}
        />
      ))}
      <h2>Total: ${calculateTotal(lineItems).toFixed(2)}</h2>
    </Box>
  );
};

export default Cart;