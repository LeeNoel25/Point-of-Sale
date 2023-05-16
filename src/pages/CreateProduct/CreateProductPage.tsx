import { Box, Container } from '@chakra-ui/react';
import CreateProductForm from './CreateProductForm';

const CreateProductPage = () => {
    return(
        <Container >
          <Box >
            <CreateProductForm />
          </Box>
        </Container>
    )
}

export default CreateProductPage;
