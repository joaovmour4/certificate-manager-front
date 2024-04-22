function SearchBarEmail(setSearch: Function){
    
    function handleSearch(event: any){
        setSearch(event.target.value)
    }

    
    return(
        <form className="flex flex-1 justify-start items-center max-w-sm">  
            <div className="w-full flex gap-x-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:shadow-md block w-full p-2.5 focus:outline-none divide-x divide-slate-300">  
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

export default SearchBarEmail