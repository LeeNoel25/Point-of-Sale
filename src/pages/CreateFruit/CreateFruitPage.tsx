import { Box, Heading, Container } from '@chakra-ui/react';
import CreateFruitForm from './CreateFruitForm';

const CreateFruitPage = () => {
    return(
        <Container>
          <Box>
            <Heading as="h1" size="lg">
              New Fruit
            </Heading>
            <CreateFruitForm />
          </Box>
        </Container>
    )
}

export default CreateFruitPage;
