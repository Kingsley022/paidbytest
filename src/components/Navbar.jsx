import { useEffect, useState } from "react";

const Navbar = ({customers, setSearchValue, refetch}) => {

  const[inputValue, setInputValue] = useState();
  const[filteredData, setFilteredData] = useState([]);

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue(inputValue);
  }

  // Auto Suggest Begins
  const customersName = customers?.map(name => name['Column 1']);
  useEffect(()=>{
    const newFilter = customersName?.filter(name => name?.toLowerCase().includes(inputValue?.toLowerCase())).slice(0, 10);
    setFilteredData(newFilter)
  }, [inputValue]);
  
  

  return (
    <div className="flex bg-slate-200 px-8 py-4 justify-between items-center">
        <h1 className="text-black text-3xl">Paid<span className="text-red-600">By...</span></h1>

        <form onSubmit={handleSubmit} className="flex w-[50%] bg-slate-400 justify-between rounded-md overflow-hidden">
            <input list="suggestions" onChange={(event) => setInputValue(event.target.value)} type="search" placeholder="Search..." id="" className="w-[90%] outline-none px-4 py-2 list-icon"/>
            {filteredData && <datalist id="suggestions">
              {filteredData?.map(data => (
                <option key={data} value={data}/>
              ))}
            </datalist>}
            <button className="bg-red-600 w-[10%] text-gray-50">Search</button>
        </form>

        <div className="w-[10%] flex items-center gap-2">
            <span className="w-[35px] h-[35px] bg-gray-500 flex items-center justify-center rounded-full text-gray-50">{customers?.length}</span>
            <span className="text-lg font-semibold">Records</span>
        </div>

    </div>
  )
}

export default Navbar