import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useState } from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';
import { Button } from '@chakra-ui/react'


const TableData = ({data, refetch={refetch}, setLocations, locations}) => {

    const[selectedColumn, setSelectedColumn] = useState(null);

    // Pagination
    const[currentPage, setCurrentPage] = useState(0); 
    const dataPerPage = 10;
    const visitedPages = currentPage * dataPerPage;
    const pageCount = Math.ceil(data?.length / dataPerPage) || 0;
    const customers = data && data?.slice(visitedPages, visitedPages + dataPerPage) || [];

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    const handleLocationUpdate = (newLocation) => {
        if (!locations.includes(newLocation) && locations.length < 3) {
            const newLocations = [...locations, newLocation];
            setLocations(newLocations);
        }
    }

    // Deleting Data(cell)
    const handleDelete = async (id) => {
        try {
            setSelectedColumn(id);
            await axios.delete(`https://api-generator.retool.com/gx8Ukr/paidbytest/${id}`);
            refetch();
        }catch (error) {
          console.error('Error deleting data:', error);
        }finally{
            setSelectedColumn(null);
        }
    };
      
  return (
    <>
        <TableContainer className=''>
            <Table variant='striped' colorScheme='gray' className=''>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Full-Name</Th>
                        <Th>Location</Th>
                        <Th>Card Number</Th>
                        <Th>SKU</Th>
                        <Th>Company</Th>
                        <Th></Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {customers?.map(customer => (
                        <Tr key={customer.id}>
                            <Td>{customer.id}</Td>
                            <Td>{customer['Column 1']}</Td>
                            <Td 
                                className='hover:text-red-600 cursor-pointer'
                                onClick={()=> handleLocationUpdate(customer['Column 2'])}>
                                {customer['Column 2']}
                            </Td>
                            <Td>{customer['Column 3']}</Td>
                            <Td>{customer['Column 5']}</Td>
                            <Td>{customer['Column 6']}</Td>
                            <Td>
                                {selectedColumn == customer?.id ? <Button
                                    isLoading
                                    loadingText='Deleting'
                                    colorScheme='teal'
                                    variant='outline'
                                ></Button>: <Button colorScheme='red' onClick={() => handleDelete(customer?.id)}>Delete</Button>}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                
            </Table>
        </TableContainer>

        {data?.length > 10 && <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center gap-4 p-4 my-4 text-gray-400"
            previousLinkClassName="bg-gray-600 text-white p-2 rounded"
            nextLinkClassName="bg-gray-600 text-white p-2 rounded"
            disabledClassName="opacity-25"
            activeClassName="text-orange-600"
            pageRangeDisplayed={2}
            marginPagesDisplayed={0}
        />}
    </>
  )
}

export default TableData