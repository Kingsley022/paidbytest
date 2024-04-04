import React, { useEffect, useState } from 'react'

const SearchForm = ({customers, setSearchValue}) => {

    const[inputValue, setInputValue] = useState();
    const[filteredData, setFilteredData] = useState([]);

    // Form Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchValue(inputValue);
    }

    // Auto Suggest
    const customersName = customers?.map(name => name['Column 1']);
    useEffect(()=>{
        const newFilter = customersName?.filter(name => name?.toLowerCase().includes(inputValue?.toLowerCase())).slice(0, 10);
        setFilteredData(newFilter)
    }, [inputValue])

  return (
    <form onSubmit={handleSubmit} className="flex w-[50%] bg-slate-400 justify-between rounded-md overflow-hidden">
        <input list="suggestions" onChange={(event) => setInputValue(event.target.value)} type="search" placeholder="Search..." id="" className="w-[90%] outline-none px-4 py-2 list-icon"/>
        {filteredData && <datalist id="suggestions">
            {filteredData?.map(data => (
            <option key={data} value={data}/>
            ))}
        </datalist>}
        <button className="bg-red-600 w-[10%] text-gray-50">Search</button>
    </form>
  )
}

export default SearchForm