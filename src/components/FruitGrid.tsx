import { SimpleGrid } from "@chakra-ui/react";
import { Fruit } from '../utilities/type-declaration';
import FruitCard from "./FruitCard";

interface Props {
    fruits: Fruit[];
  }

const FruitGrid = ({ fruits }: Props) => {

  return (
    <>
      <SimpleGrid  padding="10px" spacing={3}>
        {fruits.map((fruit) => (   
            <FruitCard key={fruit._id} fruit={fruit} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default FruitGrid;
