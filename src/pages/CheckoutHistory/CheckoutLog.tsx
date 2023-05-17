import React from 'react';
import { LineItemType } from '../../utilities/type-declaration';  
import { Tr, Td, Box, Text } from "@chakra-ui/react";

type CheckoutLogProps = {
    items: LineItemType[];
    total: number;
    _id: string;
}

const CheckoutLog: React.FC<CheckoutLogProps> = (props: CheckoutLogProps ) => {
  const { _id, items, total } = props
  
    return (
      <Tr>
        <Td>{_id}</Td>
        <Td>
          {items.map(({ _id, name, quantity }) => (
            <Box key={_id}>
              <Text>{name} ({quantity})</Text>
            </Box>
          ))}
        </Td>
        <Td>${total.toFixed(2)}</Td>
      </Tr>
    );
  };
  

export default CheckoutLog;
