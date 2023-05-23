import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, Flex, VStack, Heading, useToast } from '@chakra-ui/react';
import * as yup from "yup"
import { ProductType } from '../../utilities/type-declaration';
import { useNavigate } from 'react-router-dom';

const formSchema = yup.object().shape({
  name: yup.string().min(3, "Name must have at least 3 characters").required("This field is required"),
  imgurl: yup.string().url("Url is not valid").required("This field is required"),
  price: yup.number().min(0.1, "Price must be at least 10 cents").required("This field is required"),
  brand: yup.string().min(3, "Brand must have at least 3 characters").required("This field is required"),
})

const CreateProductForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [product, setProduct] = useState<ProductType>({
    name: "",
    imgurl: "",
    price: 0,
    brand: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await formSchema.validate(product);
      await axios.post("/api/products/new", product);
      setProduct({ name: "", imgurl: "", price: 0, brand: "" });
      toast({
        title: "Product Created.",
        description: "Successfully created product.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Validation Error",
        description: `Error: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="60vh">
      <Box p={8} bg="white" boxShadow="base" width="100%">
        <Heading as="h1" size="lg" textAlign="center" mb={5}>
          New Product
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input type="text" name="imgurl" placeholder="Image URL" value={product.imgurl} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Price ($)</FormLabel>
              <Input type="number" name="price" placeholder="Price ($)" value={product.price} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Brand</FormLabel>
              <Input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} />
            </FormControl>

            <Button colorScheme="teal" size="md" type="submit">
              Create Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateProductForm;
