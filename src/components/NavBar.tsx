import { HStack, Image, List, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavBar = () => {
    return (
        <List>
        <HStack padding='10px'> 
            <ChakraLink as={RouterLink} to="/">
                <Image src={logo} boxSize='60px' alt="logo" />
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/new">Add New Product</ChakraLink>
        </HStack>
        </List>
    )
}


export default NavBar;
