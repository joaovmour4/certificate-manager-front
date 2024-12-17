import React, { MouseEventHandler } from 'react'
import { Usuario } from '../components/ActivitiesTable/ActivitiesTable'
import api from '../services/api'

interface SessionContextData{
    searchParams: {
        setor: string
        order: {
            field: string
            ascending: boolean
        },
        competencia: {
            idCompetencia: number
            mes: string
            ano: string
        }
    }
    filterParams: {
        usersFilter: Array<Usuario>
    }
    usuarios: Array<Usuario>
    setSearchParams: Function
    setFilterParams: Function
    clearFilters: () => void
    filter: undefined | (() => void)
}
interface props{
    children: React.ReactNode
}

const Context = React.createContext<SessionContextData>({} as SessionContextData)

export function useSession(){
    const context = React.useContext(Context)

    return context
}

export const SessionProvider: React.FC<props> = ({ children }: props) => {
    const [searchParams, setSearchParams] = React.useState(()=>{
        const savedParams = localStorage.getItem('activitiesSearchParams')
        return savedParams ? JSON.parse(savedParams) : {
            setor: '1',
            order: {
                field: 'nameEmpresa',
                ascending: true
            }
        }
    })
    const [filterParams, setFilterParams] = React.useState(()=>{
        const savedParams = sessionStorage.getItem('activitiesFilterParams')
        return savedParams ? JSON.parse(savedParams) : {
            usersFilter: []
        }
    })
    const [usuarios, setUsuarios] = React.useState<Array<Usuario>>([])

    const clearFilters = () => {
        setFilterParams({usersFilter: []})
    }

    var filter;

    React.useEffect(()=>{
        localStorage.setItem('activitiesSearchParams', JSON.stringify(searchParams))
        sessionStorage.setItem('activitiesFilterParams', JSON.stringify(filterParams))
        api
            .get(`/user?setor=${searchParams.setor}&search=`)
            .then(response => {
                setUsuarios(response.data)
            })
    }, [searchParams, filterParams])

    return(
        <Context.Provider 
            value={{
                searchParams, 
                filterParams,
                usuarios, 
                setSearchParams, 
                setFilterParams,
                clearFilters,
                filter
            }}>
            {children}
        </Context.Provider>
    )
}

export type { SessionContextData }
export default Context