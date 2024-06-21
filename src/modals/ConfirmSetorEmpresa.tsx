import React from "react";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import ResponseModal from "./ResponseModal";
import { Setor } from "../App";

interface props{
    idEmpresa: number
    nameEmpresa: string
    type: string
    setShowModal: Function
    option: Setor
    setSelectedItems: Function
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

const ConfirmSetorEmpresaModal = (props: props) => {
    const [response, setResponse] = React.useState<AxiosResponseModal>()
    const [ShowResponseModal, setShowResponseModal] = React.useState(false)


    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        console.log(props.option)
        const data = {
            idSetor: props.option.idSetor,
            idEmpresa: props.idEmpresa
        }

        if(props.type === 'delete'){
            api.delete(`/setor/empresa`, {data:data})
                .then((response) => {
                    setResponse(response)
                    setShowResponseModal(true)
                })
                .catch((error: AxiosErrorModal)=>{
                    setResponse(error.response)
                    setShowResponseModal(true)
                })
        }else{
            api.post(`/setor/empresa`, {
                idSetor: props.option.idSetor,
                idEmpresa: props.idEmpresa
            })
                .then((response) => {
                    props.setSelectedItems((prevState: Array<Setor>) => [...prevState, props.option])
                    setResponse(response)
                    setShowResponseModal(true)
                })
                .catch((error)=>{
                    setResponse(error.response)
                    setShowResponseModal(true)
                    console.log(error.response)
                })
        }
    
      }
    
    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">{props.type === 'delete'?'Remover':'Incluir'} Atribuição</h3>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="block text-black text-sm font-bold mb-1">
                        Tem certeza que deseja {props.type === 'delete'?'Remover':'Incluir'} a atribuição?
                    </p>
                    <label><span className="font-semibold">Empresa:</span> {props.nameEmpresa}</label>
                    <br />
                    <label><span className="font-semibold">Setor:</span> {props.option.setorName}</label>
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

export default ConfirmSetorEmpresaModal;