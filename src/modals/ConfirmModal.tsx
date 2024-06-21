import React from "react";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import ResponseModal from "./ResponseModal";

interface props{
    id: string
    name: string
    deleteType: string
    setShowModal: Function
}
interface AxiosResponseModal extends AxiosResponse{
  data: data
}
interface data{
  message: string
}
interface AxiosErrorModal extends AxiosError{
  response: AxiosResponseModal
}

const ConfirmModal = (props:props) => {
    const [response, setResponse] = React.useState<AxiosResponseModal>()
    const [ShowResponseModal, setShowResponseModal] = React.useState(false)


    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        api.delete(`/${props.deleteType}/${props.id}`)
          .then((response) => {
            setResponse(response)
            setShowResponseModal(true)
            console.log(response.data.message)
            // setShowModal(false)
          })
          .catch((error: AxiosErrorModal)=>{
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
                  <h3 className="text-3xl font=semibold">Excluir Registro</h3>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="block text-black text-sm font-bold mb-1">
                        Tem certeza que deseja excluir o registro?
                    </p>
                    <label>{props.name}</label>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {props.setShowModal(false)}}
                  >
                    Não
                  </button>
                  <button
                      className="bg-blue active:bg-blue-active font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      onClick={handleSubmit}
                  >
                      Sim
                  </button>
                  {ShowResponseModal && response && <ResponseModal setShowModal={setShowResponseModal} response={response} setShowAddModal={props.setShowModal} />}
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export type { AxiosResponseModal, AxiosErrorModal }
export default ConfirmModal;