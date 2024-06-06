import React from 'react'
import company from '../img/companhia.png'
import logoutImg from '../img/logout.png'
import DropdownButton from '../components/DropdownButton/DropdownButton'
interface props{
    showModal: boolean
    setShowModal: Function
    buttonRef: any
}

const ProfileModal = (props: props) => {
    const appRef = React.useRef<HTMLInputElement>(null)
    React.useEffect(()=>{
        const handleClickOutside = (event: any) =>{
            if(appRef.current && !appRef.current.contains(event.target) && !props.buttonRef.current.contains(event.target))
                props.setShowModal(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])

    const logout = () =>{
        window.localStorage.removeItem('userToken')
        window.location.reload()
    }
    return (
        <div ref={appRef} className={`flex flex-col justify-center fixed bg-slate-100 font-thin shadow-md rounded right-5 mt-4`}>
            <ul className='flex-1 flex flex-col justify-center'>
                <DropdownButton 
                    clickFunction={undefined}
                    img={company}
                    name='Empresas'
                />             
                <DropdownButton 
                    clickFunction={undefined}
                    img={company}
                    name='Empresas'
                />             
                <DropdownButton 
                    clickFunction={undefined}
                    img={company}
                    name='Empresas'
                />             
                <DropdownButton 
                    clickFunction={undefined}
                    img={company}
                    name='Empresas'
                />             
                <DropdownButton 
                    clickFunction={logout}
                    img={logoutImg}
                    name='Sair'
                />
            </ul>
        </div>
    )
}

export default ProfileModal