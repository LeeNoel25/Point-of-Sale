import { useQuery } from 'react-query';
import { Table, Thead, Tbody, Tr, Th, Flex, Heading, Box } from "@chakra-ui/react";
import { SaleType } from '../../App';
import CheckoutLog from './CheckoutLog';

const getCheckoutLogs = async (): Promise<SaleType[]> =>
  await (await fetch("/api/sale/history")).json();

const CheckoutHistoryPage = () => {
  const { data, isLoading } = useQuery<SaleType[]>('checkoutLogs', getCheckoutLogs);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Flex direction="column" p={20} alignItems="center">
      <Box boxShadow="base" p={6} borderRadius="md" bg="white" width="100%" maxWidth="800px">
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Checkout Logs
        </Heading>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th fontSize="lg" fontWeight="semibold">Sale ID</Th>
              <Th fontSize="lg" fontWeight="semibold">Items</Th>
              <Th fontSize="lg" fontWeight="semibold">Sale Total</Th>
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
