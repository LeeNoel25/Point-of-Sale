import { Box, Image, Text, Button } from "@chakra-ui/react";
import { LineItemType } from '../App'

interface Props {
  product: LineItemType;
  handleincreaseQuantity: (clickedItem: LineItemType) => void;
}

const ProductCard: React.FC<Props> = ({ product, handleincreaseQuantity }) => (
  <Box>
    <Button onClick={() => handleincreaseQuantity(product)} p={0}>
      <Image boxSize="200px" src={product.imgurl} alt={product.name} />
    </Button>
    <Text mt="4" fontSize="xl" fontWeight="semibold" lineHeight="short">
      {product.name}
    </Text>
    <Text mt="2">{product.brand}</Text>
    <Text mt="2">${product.price}</Text>
  </Box>
);

export default ProductCard;
