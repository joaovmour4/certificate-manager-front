import React from 'react'
import TaskConfirmModal from '../../modals/TaskConfirmModal'
interface props{
    name: string
    idAtividade: number | undefined
    realizacaoAtividade: string | null | undefined
    value: string
    regime: string
    idEmpresa: number
    cnpjEmpresa: string
    activeEmpresa: boolean
    empresaTasks: Array<Task>
}
interface Task{
    idObrigacao: number
    obrigacaoName: string
    obrigacaoShortName: string
}
interface status{
    pendente: boolean
    date: Date
}
interface EmpresaAtividade{
    idEmpresaAtividade: number
    dataRealizacao: Date
    EmpresaIdEmpresa: number
    AtividadeIdAtividade: number
}

const forceUpdateReducer = (state: any) => !state;

const TaskCheckbox = (props: props) => {
    const [status, setStatus] = React.useState<status>({
        pendente: props.realizacaoAtividade ? false:true, 
        date: props.realizacaoAtividade ? new Date(Date.parse(props.realizacaoAtividade)) : new Date(),
    })
    const [checked, setChecked] = React.useState<boolean>()
    const [showModal, setShowModal] = React.useState(false)


    React.useEffect(()=>{
        const check = async () =>{
            if(props.realizacaoAtividade)
                setStatus((status) => {return {...status, pendente: false}})
            else
                setStatus((status) => {return {...status, pendente: true}})
        }
        check()
    }, [props.realizacaoAtividade])

    const handleCheck = () =>{
        setShowModal(!showModal)
    }

    const find = props.empresaTasks.find((item) => item.obrigacaoShortName === props.value)

    return (
        <div className='flex flex-col'>
            <input onClick={handleCheck} 
                disabled={find && props.activeEmpresa ? false:true} 
                type="checkbox" 
                checked={!status.pendente} 
                name={props.name} 
                id={`${props.cnpjEmpresa};${props.idAtividade}`} 
            />
            <label className='whitespace-nowrap text-[10px]/[10px] text-slate-500' htmlFor={props.value}>{status.pendente ? '' : `OK - ${status.date.getDate()}/${status.date.getMonth()+1}`}</label>
            {showModal && 
            <TaskConfirmModal 
                idEmpresa={props.idEmpresa}
                idAtividade={props.idAtividade} 
                task={props.name} 
                status={status} 
                setStatus={setStatus} 
                setShowModal={setShowModal}
            />
            }
        </div>
    )
}

export type { status }
export default TaskCheckbox