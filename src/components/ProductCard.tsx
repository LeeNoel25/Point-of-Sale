import { Box, Image, Text, Button, AspectRatio, Flex } from "@chakra-ui/react";
import { LineItemType } from '../utilities/type-declaration'
import { useLineItems } from './/LineItemsContext'

type Props = {
  product: LineItemType;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { increaseQuantity } = useLineItems();

  return (
    <Box bg="white" boxShadow="base" p={5} borderRadius="md">
      <AspectRatio ratio={1} overflow="hidden">
        <Button p={0} onClick={() => increaseQuantity(product)}  >
          <Image src={product.imgurl} alt={product.name} />
        </Button>
      </AspectRatio>
      <Text mt={4} fontSize="xl" fontWeight="semibold" >
        {product.name}
      </Text>
      <Flex justifyContent="space-between" mt={2}>
        <Text>{product.brand}</Text>
        <Text >${product.price}</Text>
      </Flex>
    </Box>
  );
}



export default ProductCard;
