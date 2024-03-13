function SearchBar(setSearch: Function){

    function handleSearch(event: any){
        setSearch(event.target.value)
    }

    return(
        <form className="flex flex-1 justify-start items-center max-w-sm">   
            <div className="w-full">
                <input type="text" id="simple-search" onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:shadow-md block w-full ps-10 p-2.5" placeholder="Buscar" required />
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue rounded-lg border border-blue-700 hover:bg-blue-800 focus:shadow-inner focus:brightness-90 focus:outline-none">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    )
}

export default SearchBar