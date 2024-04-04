import { useQuery } from '@tanstack/react-query';
import Navbar from "./components/Navbar"
import TableData from "./components/Table"
import { useState } from 'react';

const App = () => {

  const[searchValue, setSearchValue] = useState('');

  // Fetching Data(All)
  const{data:customers, refetch} = useQuery({
    queryKey: ['customers'], 
    queryFn: async () => {
        const response = await fetch('https://api-generator.retool.com/gx8Ukr/paidbytest');
        const data = await response.json();
        return data
    }}
  );

  // Fetching Data(search)
  const{data:searchData} = useQuery({
    queryKey: ['search', searchValue], 
    queryFn: async () => {
        const response = await fetch(`https://api-generator.retool.com/gx8Ukr/paidbytest?Column 1=${searchValue}`);
        const data = await response.json();
        return data
    },
    enabled: !!searchValue}
  );
  
  // Main Data
  const data = searchData?.length > 0 ? searchData : customers;
  return (
    <>
      <Navbar customers={data} setSearchValue={setSearchValue}/>
      <TableData data={data} refetch={refetch}/>
    </>     
  )
}

export default App