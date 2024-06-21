import React from 'react'
import api from '../services/api'
import { jwtDecode } from 'jwt-decode';
import { Token } from '../App';
import { Usuario } from '../components/ActivitiesTable/ActivitiesTable';

interface props{
    children: React.ReactNode
}
interface AuthContextData {
    signed: boolean;
    user: Usuario | null;
    Login(data: object): Promise<void | Error>
    Logout(): void
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<props> = ({ children } : props) =>{
    const [user, setUser] = React.useState<Usuario | null>(null)

    function Login(data: object){
        return (
            api
                .post('/login', data)
                .then(response => {
                    if(response.status === 200){
                        const token: Token = jwtDecode(response.data.authentication.token)
                        setUser(token.user)
                        window.localStorage.setItem('userToken', response.data.authentication.token)
                        window.localStorage.setItem('user', JSON.stringify(token.user))
                        window.location.reload()
                    }
                })
        )
    }
    function Logout(){
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('user')
        window.location.reload()
    }

    React.useEffect(()=>{
        const storagedToken = localStorage.getItem('userToken')
        const storagedUser = localStorage.getItem('user')
        
        if(storagedToken && storagedUser){
            setUser(JSON.parse(storagedUser))
        }
    }, [])

    return(
        <AuthContext.Provider 
            value={{ signed: Boolean(user), user, Login, Logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = React.useContext(AuthContext)

    return context
}

export default AuthContext