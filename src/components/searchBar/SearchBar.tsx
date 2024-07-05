import React from "react"
interface props{
    setSearch: Function
    setFilter: Function
    options: Array<option>
}
interface option{
    value: string
    name: string
}
function SearchBar(props: props){
    
    function handleSearch(event: React.ChangeEvent<HTMLInputElement>){
        props.setSearch(event.target.value)
    }

    function handleFilter(event: React.ChangeEvent<HTMLSelectElement>){
        props.setFilter(event.target.value)
    }
    
    return(
        <form className="flex flex-1 justify-start items-center max-w-sm place-self-start">  
            <div className="w-full flex gap-x-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:shadow-md block w-full p-2.5 focus:outline-none divide-x divide-slate-300">
                <select className="flex-none bg-transparent font-thin focus:outline-none cursor-pointer select-none" onChange={handleFilter}>
                    {props.options.map((option) => {
                        return (
                            <option value={option.value}>{option.name}</option>
                        )
                    })}
                </select>    
                <div className="flex flex-1 pl-3">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <input type="text" id="simple-search" onChange={handleSearch} className="pl-3 bg-transparent grow focus:outline-none" placeholder="Buscar" required />
                </div>
            </div>
        </form>
    )
}

export default SearchBar