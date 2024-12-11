import React from "react";
import { status } from "../components/TaskCheckbox/TaskCheckbox";
import api from "../services/api";
import { useAuth } from "../contexts/auth";
import { useSession } from "../contexts/sessionContext";

interface props{
    idEmpresa: number
    idAtividade: number | undefined
    task: string
    status: status
    setStatus: Function
    setShowModal: Function
}

const TaskConfirmModal = (props:props) => {
    const Auth = useAuth()
    const Session = useSession()
    const [statusSM, setStatusSM] = React.useState<boolean>(false)

    function handleSubmit() {
      console.log(Session.searchParams.competencia.idCompetencia)

      api
        .post(`/user/atividade/${props.status.pendente ? '' : 'cancelarAtividade'}`, {
          idEmpresa: props.idEmpresa,
          idAtividade: props.idAtividade,
          idCompetencia: Session.searchParams.competencia.idCompetencia,
          idUsuario: Auth.user?.idUsuario,
          statusAtividade: statusSM ? 'SM' : 'OK'
        })
        .then((response) => {
          window.location.reload()
          console.log(response)
        })
        .catch((error) => {
          console.log(error.response)
        })
      props.setShowModal(false)
    }

    const handleSM = () => {
      setStatusSM(prevStatus => !prevStatus)
    }
    
    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-2/5 my-6 mx-auto max-w-3xl">
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold whitespace-nowrap">{props.status.pendente ? 'Concluir atividade':'Marcar atividade pendente'}</h3>
                </div>
                <div className="relative flex flex-col items-start p-6">
                    <p className="block text-black text-sm font-bold mb-1">
                        Tem certeza que deseja sinalizar a {props.status.pendente ? 'conclusão da atividade':'atividade como pendente'}?
                    </p>
                    <label className="place-self-center">{props.task}</label> 
                    {props.status.pendente && 
                      <label className="flex pt-5 gap-x-2">
                        <input type="checkbox" checked={statusSM} onClick={handleSM} />
                        Sem movimento
                      </label>
                    }
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
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export default TaskConfirmModal;