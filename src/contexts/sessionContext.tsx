import React from 'react'
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
    setSearchParams: Function
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
        const savedParams = sessionStorage.getItem('activitiesSearchParams')
        return savedParams ? JSON.parse(savedParams) : {
            setor: '1',
            order: {
                field: 'nameEmpresa',
                ascending: true
            }
        }
    })

    React.useEffect(()=>{
        sessionStorage.setItem('activitiesSearchParams', JSON.stringify(searchParams))
    }, [searchParams])

    return(
        <Context.Provider value={{searchParams, setSearchParams}}>
            {children}
        </Context.Provider>
    )
}

export type { SessionContextData }
export default Context