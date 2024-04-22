import React from "react";
import api from "../services/api";

interface props{
    id: string
    name: string
    setShowModal: Function
    setResponse: Function
    setShowResponseModal: Function
}

const EditEmailModal = (props:props) => {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setName(event.target.value)
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value)
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        const data ={
            name: name,
            email: email
        }

        api.put(`/email/${props.id}`, data)
          .then((response) => {
            props.setResponse(response)
            props.setShowResponseModal(true)
            console.log(response.data.message)
            props.setShowModal(false)
          })
          .catch((error:any)=>{
            props.setResponse(error.response)
            props.setShowResponseModal(true)
            props.setShowModal(false)
          })
    
      }
    
    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Editar Email</h3>
                </div>
                <div className="relative p-6 flex-auto">
                    <label className="block text-black text-sm font-bold mb-1">
                        {props.name}
                    </label>
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label htmlFor="name" className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Nome
                    </label>
                    <input id="name" type="text" onChange={handleName} className="shadow appearance-none border rounded w-full py-2 px-1 file:rounded file:bg-blue text-slate-500" />
                    <label htmlFor="email" className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      E-Mail
                    </label>
                    <input id="email" onChange={handleEmail} type="email" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Fechar
                  </button>
                    <button
                        className="bg-blue active:bg-blue-active font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        onClick={handleSubmit}
                    >
                        Enviar
                    </button>
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export default EditEmailModal;