import React from 'react';
import { LineItemType } from '../../App';  
import { Tr, Td } from "@chakra-ui/react";

type CheckoutLogProps = {
    items: LineItemType[];
    total: number;
    _id: string;
}

const CheckoutLog: React.FC<CheckoutLogProps> = ({ items, total, _id }) => {
    return (
        <Tr>
            <Td>{_id}</Td>
            <Td>
                {items.map(item => (
                    <div key={item._id}>
                        <p>{item.name} ({item.quantity})</p>
                    </div>
                ))}
            </Td>
            <Td>${total.toFixed(2)}</Td>
        </Tr>
    );
};

export default CheckoutLog;
