import React from "react";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import ResponseModal from "./ResponseModal";

interface props{
  setShowModal: Function
}

const AddEmailModal = ({setShowModal}:props) => {
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [response, setResponse] = React.useState<AxiosResponse>()
    const [ShowResponseModal, setShowResponseModal] = React.useState(false)

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value)
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
    }

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        const data = {
          name: name,
          email: email
        }

        api.post(`/email`, data)
          .then((response) => {
            console.log(data)
            setResponse(response)
            setShowResponseModal(true)
            console.log(response.data.message)
            // setShowModal(false)
          })
          .catch((error: AxiosError)=>{
            setResponse(error.response)
            setShowResponseModal(true)
            // setShowModal(false)
          })
    
      }
    
    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Adicionar E-Mail</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Nome
                    </label>
                    <input onChange={handleName} className="shadow appearance-none border rounded w-full py-2 px-1 file:rounded file:bg-blue text-slate-500" />
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      E-Mail
                    </label>
                    <input onChange={handleEmail} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {setShowModal(false)}}
                  >
                    Fechar
                  </button>
                  <button
                      className="bg-blue active:bg-blue-active font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      onClick={handleSubmit}
                  >
                      Adicionar
                  </button>
                  {ShowResponseModal && response && 
                    <ResponseModal setShowAddModal={setShowModal} response={response} setShowModal={setShowResponseModal}/>}
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export default AddEmailModal;