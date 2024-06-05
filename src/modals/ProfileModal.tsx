import React from 'react'
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
        <div ref={appRef} className={`${props.showModal ? 'h-32 w-28':'h-0 w-0 invisible'} px-3 py-1 fixed bg-slate-100 font-thin shadow rounded transition-[height] duration-100 ease-in-out`}>
            <ul>
                <li>
                    <button>
                        Empresas
                    </button>
                </li>
                <li>
                    <button>
                        Empresas
                    </button>
                </li>
                <li>
                    <button>
                        Empresas
                    </button>
                </li>
                <li>
                    <button>
                        Empresas
                    </button>
                </li>
                <li>
                    <button onClick={logout}>
                        Sair
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileModal