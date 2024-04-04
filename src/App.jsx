import { useQuery } from '@tanstack/react-query';
import Navbar from "./components/Navbar"
import TableData from "./components/Table"
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import SkeletonComponent from './components/Skeleton';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedLocations, setSelectLocations] = useState([]);

  const { data: customers, refetch, isLoading:loading} = useQuery({
    queryKey: ['customers'], 
    queryFn: async () => {
        const response = await fetch('https://api-generator.retool.com/gx8Ukr/paidbytest');
        const data = await response.json();
        return data
    }}
  );

  const { data: searchData, isLoading } = useQuery({
    queryKey: ['search', searchValue], 
    queryFn: async () => {
        const response = await fetch(`https://api-generator.retool.com/gx8Ukr/paidbytest?Column 1=${searchValue}`);
        const data = await response.json();
        return data
    },
    enabled: !!searchValue
  });

  useEffect(() => {
    let filtered = searchData || customers;

    if (filteredData?.length > 0) {
      filtered = filteredData;
    }

    if(searchData){
      filtered = searchData
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(customer => selectedLocations.includes(customer["Column 2"]));
    }

    setFilteredData(filtered);
  }, [searchData, customers, filteredData, selectedLocations]);



  return (
    <>
      <Navbar customers={customers} setSearchValue={setSearchValue} isLoading={isLoading}/>
      <Filter data={customers} setFilteredData={setFilteredData} locations={selectedLocations}/>
      {(isLoading || loading) ? <SkeletonComponent/> : <TableData data={filteredData} refetch={refetch} isLoading={loading} setLocations={setSelectLocations} locations={selectedLocations}/>}
    </>
  )
}

export default App;
