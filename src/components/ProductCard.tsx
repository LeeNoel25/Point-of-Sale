import { Box, Image, Text, Button } from "@chakra-ui/react";
import { LineItemType}  from '../App'

interface Props {
    product: LineItemType;
    handleAddToCart: (clickedItem: LineItemType) => void;
  }

  const ProductCard: React.FC<Props> = ({ product, handleAddToCart }) => (
     <Box>
        <Image boxSize="200px" src={product.imgurl} alt={product.name} />
        <Text mt="4" fontSize="xl" fontWeight="semibold" lineHeight="short">
          {product.name}
        </Text>
        <Text mt="2">{product.brand}</Text>
        <Text mt="2">${product.price}</Text>
        <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
      </Box>
    );
  

export default ProductCard;