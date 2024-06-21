import { AxiosResponse } from 'axios'
import React from 'react'
import ResponseModal from './ResponseModal'
import api from '../services/api'
import { Empresa } from '../components/ActivitiesTable/ActivitiesTable'
interface props{
    empresa: Empresa
    active: boolean
    setActiveEmpresa: Function
    setShowModal: Function
}
interface AxiosLockResponseModal extends AxiosResponse{
    data: Data
}
interface Data{
    message: string
    empresaBloqueada: number
    countEmpresas: number
}

const ConfirmLockModal = (props: props) => {
    const [showResponseModal, setShowResponseModal] = React.useState(false)
    const [response, setResponse] = React.useState<AxiosLockResponseModal>()

    const handleSubmit = () =>{
        api
            .patch(`/empresa/${props.active?'lock':'unlock'}/${props.empresa.idEmpresa}`)
            .then(response=>{
                setResponse(response)
                props.setActiveEmpresa((prevState: boolean) => !prevState)
                setShowResponseModal(true)
            })
            .catch(error=>{
                setResponse(error.response)
                setShowResponseModal(true)
            })
    }

    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">{props.active?'Bloquear':'Desbloquear'} Empresa</h3>
                </div>
                <div className="relative p-6 flex-auto">
                    <p className="block text-black text-sm font-bold mb-1">
                        Tem certeza que deseja {props.active?'bloquear':'desbloquear'} esta Empresa?
                    </p>
                    <label>{props.empresa.nameEmpresa}</label>
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
                  {showResponseModal && response && <ResponseModal setShowModal={setShowResponseModal} response={response} setShowAddModal={props.setShowModal} />}
                </div>
              </div>
            </div>
          </div>
        </>
    );
}

export type { AxiosLockResponseModal }
export default ConfirmLockModal