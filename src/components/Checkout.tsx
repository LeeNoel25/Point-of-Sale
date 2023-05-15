import { LineItemType}  from '../App'
import LineItem from './LineItem';
import { Box, Grid, GridItem, Button } from "@chakra-ui/react";
import axios from 'axios';
import React, { useState } from 'react';

type Props = {
    lineItems: LineItemType[];
    increaseQuantity: (clickedProduct: LineItemType) => void;
    reduceQuantity: (id: string) => void;
    totalItems: number;
};

const Cart: React.FC<Props> = ({ lineItems, increaseQuantity, reduceQuantity }) => {
  const [sale, setSale] = useState<LineItemType[] | null>(null);

  const calculateTotal = (product: LineItemType[]) =>
    product.reduce((current: number, product) => current + product.quantity * product.price, 0);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    axios.post(`/api/sale`, { lineItems, calculateTotal })
    .then((response) => {
        console.log(response);
        setSale([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      <h2>Shopping Cart ({lineItems.length} items)</h2>
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
      <Button onClick={handleSubmit}>Create Sale</Button>
    </Box>
  );
};

export default Cart;
