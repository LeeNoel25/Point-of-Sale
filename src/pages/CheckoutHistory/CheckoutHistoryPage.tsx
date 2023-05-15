import { useQuery } from 'react-query'
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { SaleType } from '../../App'
import CheckoutLog from './CheckoutLog';

const getCheckoutLogs = async (): Promise<SaleType[]> =>
    await (await fetch("/api/sale/history")).json();

const CheckoutHistoryPage = () => {
    const { data, isLoading } = useQuery<SaleType[]>(
        'checkoutLogs',
        getCheckoutLogs
    );

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Checkout Logs</h1>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Sale ID</Th>
                        <Th>Items</Th>
                        <Th>Sale Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((sale: SaleType) => (
                        <CheckoutLog key={sale._id} items={sale.items} total={sale.total} _id={sale._id}/>  
                    ))}
                </Tbody>
            </Table>
        </div>
    );
}

export default CheckoutHistoryPage;
