import React from 'react'
import api from '../../services/api'
import EditEmailModal from '../../views/EditEmail'
import ResponseModal from '../../modals/ResponseModal'
import ConfirmModal from '../../modals/ConfirmModal'

interface Email{
    _id: string
    name: string
    email: string
}
interface props{
    search: string
}

const EmailTable = ({search}: props) => {
    const [arr, setArr] = React.useState<Array<Email>>([])
    const [showEditModal, setShowEditModal] = React.useState(false)
    const [showRemoveModal, setShowRemoveModal] = React.useState(false)
    const [showResponseModal, setShowResponseModal] = React.useState(false)
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [response, setResponse] = React.useState('')

    const handleShowEdit = (id: string, name: string)=>{
        setId(id)
        setName(name)
        setShowEditModal(true)
    }

    const handleRemove = (id: string, name: string) =>{
        setId(id)
        setName(name)
        setShowRemoveModal(true)
    }

    React.useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            api
                .get(`/email/search/${search}`)
                .then(response => {
                    setArr(response.data)
                })
                .catch((err:any) => {
                    console.log(err.message)
                })
        }, 300)

        return ()=> clearTimeout(delayDebounceFn)
    }, [search])

  return (
    <>
        <table className="flex-1 grow w-full table-auto text-center divide-y">
            <thead>
                <tr>
                    <th className="w-3/5 ">
                        <th className="flex justify-self-start items-center text-left pl-5 pr-1">Usuário</th>
                    </th>
                    <th>
                        E-Mail
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y content-center">
                {arr.map((email: Email) =>{
                    return(
                        <tr>
                            <td>
                                <div className="text-left flex flex-row pl-5">
                                    <p className="grow text-wrap">{email?.name}</p>
                                </div>
                            </td>
                            <td className="text-left">{email?.email}</td>
                            <td className="flex justify-evenly content-center">
                                <button onClick={()=> handleShowEdit(email?._id, email?.name)}>
                                    <svg className="h-5 w-5 hover:fill-yellow-500" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/></svg>
                                </button>
                                <button onClick={()=> handleRemove(email?._id, email?.name)}>
                                    <svg className="h-5 w-5 hover:fill-red-500" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {showEditModal? <EditEmailModal id={id} name={name} setShowModal={setShowEditModal} setResponse={setResponse} setShowResponseModal={setShowResponseModal}/>:null}
        {showRemoveModal? <ConfirmModal id={id} name={name} deleteType='email' setShowModal={setShowRemoveModal}/>:null}
        {showResponseModal? ResponseModal(setShowResponseModal, response, setShowEditModal):null}
    </>
  )
}

export default EmailTable