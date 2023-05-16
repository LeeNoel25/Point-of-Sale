import { Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Flex
          align="center"
          justifyContent="center"
          padding="1.5rem"
          bg="teal.500"
          color="white"
        >
        <ChakraLink as={RouterLink} to="/" mr={200} fontWeight="semibold" >Home</ChakraLink>
        <ChakraLink as={RouterLink} to="/new" mr={200} fontWeight="semibold">Add new product</ChakraLink>
        <ChakraLink as={RouterLink} to="/history" fontWeight="semibold">Sale history</ChakraLink>
        </Flex>
    )
}

export default NavBar;

