import React from 'react'
import { Usuario } from '../ActivitiesTable/ActivitiesTable'
import ProfileModal from '../../modals/ProfileModal'
import profileImg from '../../img/user.png'
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
            <button ref={buttonRef} onClick={handleModal} className='font-thin select-none h-[35px] w-[35px] bg-white rounded-full flex justify-center items-center mr-7'>
                <img src={profileImg} alt="" className='h-[30px] w-[30px]'/>
            </button>
            {showModal && <ProfileModal buttonRef={buttonRef} showModal={showModal} setShowModal={setShowModal}/>}
        </>
    )
}

export default ProfileButton