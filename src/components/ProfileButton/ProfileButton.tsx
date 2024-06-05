import React from 'react'
import { Usuario } from '../ActivitiesTable/ActivitiesTable'
import ProfileModal from '../../modals/ProfileModal'
interface props{
    user: Usuario
}

const ProfileButton = (props: props) => {
    const [showModal, setShowModal] = React.useState(false)
    const buttonRef = React.useRef(null)

    const handleModal = () =>{
        setShowModal(prevState => !prevState)
    }

    return (
        <>
            <button ref={buttonRef} onClick={handleModal} className='px-5 font-thin select-none'>Olá, {props.user.username}</button>
            {<ProfileModal buttonRef={buttonRef} showModal={showModal} setShowModal={setShowModal}/>}
        </>
    )
}

export default ProfileButton