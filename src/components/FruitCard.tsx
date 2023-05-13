import { Fruit } from '../utilities/type-declaration';
import { Box, Image, Text } from "@chakra-ui/react";

const FruitCard = ({ fruit }: { fruit: Fruit }) => {

    return (
      <Box boxShadow="xl" p="6" rounded="md" bg="white">
        <Image boxSize="200px" src={fruit.imgurl} alt={fruit.name} />
        <Text mt="4" fontSize="xl" fontWeight="semibold" lineHeight="short">
          {fruit.name}
        </Text>
        <Text mt="2">{fruit.category}</Text>
        <Text mt="2">{fruit.price}</Text>
      </Box>
    );
};

export default FruitCard;