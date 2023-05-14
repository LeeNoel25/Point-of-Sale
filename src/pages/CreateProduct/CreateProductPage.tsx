import { Box, Heading, Container } from '@chakra-ui/react';
import CreateProductForm from './CreateProductForm';

const CreateProductPage = () => {
    return(
        <Container>
          <Box>
            <Heading as="h1" size="lg">
              New Product
            </Heading>
            <CreateProductForm />
          </Box>
        </Container>
    )
}

export default CreateProductPage;
