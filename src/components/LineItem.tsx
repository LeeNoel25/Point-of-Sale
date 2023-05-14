import { LineItemType}  from '../App'
import {  Button, Grid, GridItem } from "@chakra-ui/react";

type Props = {
    product: LineItemType;
    increaseQuantity: (clickedItem: LineItemType) => void;
    reduceQuantity: (id: string) => void;
};

const LineItem: React.FC<Props> = ({ product, increaseQuantity, reduceQuantity }) => (
  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
    <GridItem>
      <h4>{product.name}</h4>
    </GridItem>
    <GridItem>
    <Grid templateColumns="repeat(6, 1fr)" alignItems="center">
        <Button size='sm' variant='outline' onClick={() => reduceQuantity(product._id)} height="24px" width="24px">
          -
        </Button>
        <h4>{product.quantity}</h4>
        <Button size='sm' variant='outline' onClick={() => increaseQuantity(product)} height="24px" width="24px">
          +
        </Button>
      </Grid>
    </GridItem>
    <GridItem>
      <h4>${product.price}</h4>
    </GridItem>
    <GridItem>
      <h4>${(product.quantity * product.price).toFixed(2)}</h4>
    </GridItem>
  </Grid>
);

export default LineItem;
    {/* <Image src={product.imgurl} alt={product.name} /> */}
