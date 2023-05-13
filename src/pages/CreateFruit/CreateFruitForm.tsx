import axios from 'axios';
import { useState } from 'react';
import { Button } from '@chakra-ui/react'
import * as yup from "yup"
import { Fruit } from '../../utilities/type-declaration';

const formSchema = yup.object().shape({
    name: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
    imgurl: yup.string().url("Must be a valid Url").required("This field is required"),
    price: yup.number().min(0.1, "Must be at least 10 cents").required("This field is required"),
    category: yup.string().min(3, "Must be at least 3 characters").required("This field is required"),
})

const CreateFruitForm = () => {
    const [fruit, setFruit] = useState<Fruit>({
    name: "",
    imgurl: "",
    price: 0,
    category: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFruit({
      ...fruit,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    formSchema
    .validate(fruit)
    .then(() => {
        axios.post("/api/fruits/new", { ...fruit, price: Number(fruit.price) })
      .then((response) => {
        console.log(response);
        setFruit({ name: "", imgurl: "", price: 0, category: "" });
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
        <input type="text" name="name" value={fruit.name} onChange={handleChange} />
      </label>

      <label>
        Image URL:
        <input type="text" name="imgurl" value={fruit.imgurl} onChange={handleChange} />
      </label>

      <label>
        Price:
        <input type="number" name="price" value={fruit.price} onChange={handleChange} />
      </label>

      <label>
        Category:
        <input type="text" name="category" value={fruit.category} onChange={handleChange} />
      </label>
      <Button type="submit" value="Submit">Create Fruit</Button>
    </form>
  );
};

export default CreateFruitForm;
