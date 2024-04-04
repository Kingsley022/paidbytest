import SearchForm from "./SearchForm";

const Navbar = ({customers, setSearchValue}) => { 

  return (
    <div className="flex bg-slate-200 px-8 py-4 justify-between items-center">
        <h1 className="text-black text-3xl">Paid<span className="text-red-600">By...</span></h1>
        <SearchForm customers={customers} setSearchValue={setSearchValue}/>
        <div className="w-[10%] flex items-center gap-2">
            <span className="w-[35px] h-[35px] bg-gray-500 flex items-center justify-center rounded-full text-gray-50">{customers?.length}</span>
            <span className="text-lg font-semibold">Records</span>
        </div>
    </div>
  )
}

export default Navbar