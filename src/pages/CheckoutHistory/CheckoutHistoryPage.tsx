import { useQuery } from 'react-query';
import { Table, Thead, Tbody, Tr, Th, Flex, Heading, Box, Spinner } from "@chakra-ui/react";
import { SaleType } from '../../utilities/type-declaration'
import CheckoutLog from './CheckoutLog';

const getCheckoutLogs = async (): Promise<SaleType[]> =>
  (await fetch("/api/sale/history")).json();

const CheckoutHistoryPage = () => {
  const { data, isLoading } = useQuery<SaleType[]>('checkoutLogs', getCheckoutLogs);
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
