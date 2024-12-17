import React from 'react'
import UserFilter from '../Filters/UserFilter/UserFilter'
import { useSession } from '../../contexts/sessionContext'

const FilterModal = () => { 

    const { clearFilters, filter } = useSession()

    return (
        <div className='absolute z-10 flex flex-col min-w-56 min-h-20 px-3 py-3 top-full flex gap-x-1 gap-y-3 justify-center items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded shadow'>
            <UserFilter />
            <div className='flex justify-between'>
                <button type="reset" onClick={clearFilters} className='py-2 px-5 bg-neutral-500 text-white rounded'>
                    LIMPAR
                </button>
                <button onClick={filter} className='py-2 px-5 bg-green-500 text-white rounded'>
                    FILTRAR
                </button>
            </div>
        </div>
    )
}

export default FilterModal