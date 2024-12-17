import React from 'react'
import UserFilter from '../Filters/UserFilter/UserFilter'
import { useSession } from '../../contexts/sessionContext'

interface Props{
    setShowFilterModal: Function
    buttonRef: React.RefObject<HTMLButtonElement>
}

const FilterModal = (props: Props) => { 
    const appRef = React.useRef<HTMLDivElement>(null)

    const { clearFilters, setFilterParams, filteredUsers  } = useSession()

    const filterHandler = () => {
        setFilterParams({
            usersFilter: filteredUsers
        })
        props.setShowFilterModal(false)
    }

    React.useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) =>{
            if(appRef.current && !appRef.current.contains(event.target as Node) && !props.buttonRef.current?.contains(event.target as Node))
                props.setShowFilterModal(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])

    return (
        <div ref={appRef} className='absolute z-10 flex flex-col min-w-64 min-h-20 px-3 py-3 top-full flex gap-x-1 gap-y-3 justify-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded shadow'>
            <UserFilter />
            <div className='flex flex-1 flex-row justify-between'>
                <button type="reset" onClick={clearFilters} className='py-2 px-5 border border-neutral-500 rounded hover:bg-neutral-200'>
                    LIMPAR
                </button>
                <button onClick={filterHandler} className='py-2 px-5 bg-green-600 text-white rounded hover:bg-green-500'>
                    FILTRAR
                </button>
            </div>
        </div>
    )
}

export default FilterModal