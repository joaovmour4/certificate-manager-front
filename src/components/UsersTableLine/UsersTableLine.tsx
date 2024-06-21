import React from 'react'
import { Usuario } from '../ActivitiesTable/ActivitiesTable'
import ConfirmModal from '../../modals/ConfirmModal'
import EditUserModal from '../../modals/EditUserModal'
interface props{
    usuario: Usuario
}

const UsersTableLine = (props: props) => {
    const [showRemoveConfirmModal, setShowRemoveConfirmModal] = React.useState(false)
    const [showEditModal, setShowEditModal] = React.useState(false)

    const handleRemove = () =>{
        setShowRemoveConfirmModal(true)
    }
    const handleEdit = () =>{
        setShowEditModal(true)
    }

    return (
        <tr className='text-center'>
            <td className='font-thin text-left pl-5 grow-1'>
                {props.usuario.username}
            </td>
            <td>
                {props.usuario.Setor?.setorName}
            </td>
            <td>
                <div className='flex justify-evenly'>
                    <button onClick={handleEdit} className='flex flex-col justify-center items-center text-[10px] text-yellow-600 hover:text-yellow-500 fill-yellow-600 hover:fill-yellow-500'>
                        <svg className="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/></svg>
                    </button>
                    <button onClick={handleRemove} className='flex flex-col justify-center items-center text-[10px] text-red-700 hover:text-red-500 fill-red-700 hover:fill-red-500'>
                        <svg className="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                    </button>
                </div>
            </td>
            {showEditModal && 
                <EditUserModal 
                    idUsuario={props.usuario.idUsuario}
                    setShowModal={setShowEditModal}
                />
            }
            {showRemoveConfirmModal && 
                <ConfirmModal 
                    deleteType='user'
                    id={String(props.usuario.idUsuario)}
                    name={props.usuario.username}
                    setShowModal={setShowRemoveConfirmModal}
                />
            }
        </tr>
    )
}

export default UsersTableLine