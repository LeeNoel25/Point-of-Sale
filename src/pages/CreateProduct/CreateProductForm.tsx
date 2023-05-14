import axios from 'axios';
import { useState } from 'react';
import { Button } from '@chakra-ui/react'
import * as yup from "yup"
import { Product } from '../../utilities/type-declaration';

const formSchema = yup.object().shape({
    name: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
    imgurl: yup.string().url("Must be a valid Url").required("This field is required"),
    price: yup.number().min(0.1, "Must be at least 10 cents").required("This field is required"),
    brand: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
})

const CreateProductForm = () => {
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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </label>

      <label>
        Image URL:
        <input type="text" name="imgurl" value={product.imgurl} onChange={handleChange} />
      </label>

      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} />
      </label>

      <label>
        Brand:
        <input type="text" name="brand" value={product.brand} onChange={handleChange} />
      </label>
      <Button type="submit" value="Submit">Create Product</Button>
    </form>
  );
};

export default CreateProductForm;
