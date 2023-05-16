import axios from 'axios';
import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, Flex, VStack, Heading } from '@chakra-ui/react';
import * as yup from "yup"
import { Product } from '../../utilities/type-declaration';
import { useNavigate } from 'react-router-dom';

const formSchema = yup.object().shape({
    name: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
    imgurl: yup.string().url("Must be a valid Url").required("This field is required"),
    price: yup.number().min(0.1, "Must be at least 10 cents").required("This field is required"),
    brand: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
})

const CreateProductForm = () => {
  const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    formSchema
    .validate(product)
    .then(() => {
        axios.post("/api/products/new", { ...product, price: Number(product.price) })
      .then((response) => {
        console.log(response);
        setProduct({ name: "", imgurl: "", price: 0, brand: "" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((validationError) => {
    console.error(validationError);
  });
};

return (
  <Flex justifyContent="center" alignItems="center" height="60vh">
    <Box p={8} borderRadius="md" bg="white" boxShadow="base"  width="100%">
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
