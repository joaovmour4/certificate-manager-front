import React from 'react'
import company from '../img/companhia.png'
import logoutImg from '../img/logout.png'
import obrigacoesImg from '../img/obrigacoes.png'
import users from '../img/users.png'
import DropdownButton from '../components/DropdownButton/DropdownButton'
import { Usuario } from '../components/ActivitiesTable/ActivitiesTable'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
interface props{
    showModal: boolean
    setShowModal: Function
    buttonRef: React.RefObject<HTMLButtonElement>
    user: Usuario
}

const ProfileModal = (props: props) => {
    const Auth = useAuth()
    const appRef = React.useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    React.useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) =>{
            if(appRef.current && !appRef.current.contains(event.target as Node) && !props.buttonRef.current?.contains(event.target as Node))
                props.setShowModal(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])

    const usersButton = () => {
        navigate('/usuarios')
        props.setShowModal(false)
    }
    const obrigacoesButton = () => {
        navigate('/obrigacoes')
        props.setShowModal(false)
    }
    const empresasButton = () => {
        navigate('/empresas')
        props.setShowModal(false)
    }

    return (
        <div ref={appRef} className={`flex flex-col justify-center absolute border bg-slate-100 font-thin shadow-md rounded right-5 mt-4`}>
            <ul className='flex-1 flex flex-col justify-center'>
                <li className='bg-slate-200 px-3 py-1 select-none'>
                    <p>
                        {props.user.username}
                    </p>
                </li>
                {Auth.user?.cargo !== 'operador' && // Opção liberada a administradores e supervisores
                <DropdownButton 
                    clickFunction={usersButton}
                    img={users}
                    name='Usuarios'
                />}
                {Auth.user?.cargo !== 'operador' && // Opção liberada a administradores e supervisores
                <DropdownButton 
                    clickFunction={obrigacoesButton}
                    img={obrigacoesImg}
                    name='Obrigações'
                />}
                <DropdownButton 
                    clickFunction={empresasButton}
                    img={company}
                    name='Empresas'
                />
                <DropdownButton
                    clickFunction={Auth.Logout}
                    img={logoutImg}
                    name='Sair'
                />
            </ul>
        </div>
    )
}

export default ProfileModal