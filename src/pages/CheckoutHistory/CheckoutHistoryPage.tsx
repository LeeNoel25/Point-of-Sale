import axios from 'axios';
import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Flex, Heading, Box, Spinner } from "@chakra-ui/react";
import { SaleType } from '../../utilities/type-declaration'
import CheckoutLog from './CheckoutLog';

const getCheckoutLogs = async (): Promise<SaleType[]> => {
  const response = await axios.get("/api/sale/history");
  return response.data;
};

const CheckoutHistoryPage = () => {
  const [data, setData] = useState<SaleType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCheckoutLogs().then((checkoutLogs) => {
      setData(checkoutLogs);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <Flex direction="column" p={20} alignItems="center">
      <Box boxShadow="base" p={6} borderRadius="md" bg="white" width="100%" maxWidth="800px">
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Checkout Logs
        </Heading>
        <Table >
          <Thead>
            <Tr>
              <Th fontSize="lg" >Sale ID</Th>
              <Th fontSize="lg" >Items</Th>
              <Th fontSize="lg" >Sale Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((sale: SaleType) => (
              <CheckoutLog key={sale._id} items={sale.items} total={sale.total} _id={sale._id} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default CheckoutHistoryPage;
