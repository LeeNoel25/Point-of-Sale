import { LineItemType}  from '../utilities/type-declaration'
import {  Button, Grid, GridItem, Text } from "@chakra-ui/react";

type Props = {
    product: LineItemType;
    increaseQuantity: (clickedItem: LineItemType) => void;
    reduceQuantity: (id: string) => void;
    removeLineItem: (clickedItem: LineItemType) => void;
};

const LineItem: React.FC<Props> = ({ product, increaseQuantity, reduceQuantity, removeLineItem }) => (
  <Grid templateColumns="repeat(5, 1fr)" gap={6}>
    <GridItem>
      <h4>{product.name}</h4>
    </GridItem>
    <GridItem>
    <Grid templateColumns="repeat(6, 1fr)" alignItems="center">
        <Button size='sm' variant='outline' onClick={() => reduceQuantity((product._id || ""))} height="24px" width="24px">
          -
        </Button>
        <h4>{product.quantity}</h4>
        <Button size='sm' variant='outline' onClick={() => increaseQuantity(product)} height="24px" width="24px">
          +
        </Button>
      </Grid>
    </GridItem>
    <GridItem>
      <Text>${product.price}</Text>
    </GridItem>
    <GridItem>
      <Text>${((product.quantity || 0) * product.price).toFixed(2)}</Text>
    </GridItem>
    <GridItem>
    <Button size='sm' variant='outline' onClick={() => removeLineItem(product)} height="24px" width="60px">
      Remove
    </Button>
    </GridItem>
  </Grid>
);


export default LineItem;

