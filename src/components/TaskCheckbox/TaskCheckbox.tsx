import React from 'react'
import TaskConfirmModal from '../../modals/TaskConfirmModal'
import { Obrigacao, OrderType, situacaoFinanceiro } from '../ActivitiesTable/ActivitiesTable'
interface props{
    name: string
    idAtividade: number | undefined
    realizacaoAtividade: string | null | undefined
    value: string
    regime: string
    idEmpresa: number
    cnpjEmpresa: string
    activeEmpresa: boolean
    situacaoFinanceiro: situacaoFinanceiro
    empresaTasks: Array<Task>
    obrigacao?: Obrigacao
    status?: string
    order: OrderType
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

const TaskCheckbox = (props: props) => {
    const [status, setStatus] = React.useState<status>({
        pendente: props.realizacaoAtividade ? false:true, 
        date: props.realizacaoAtividade ? new Date(Date.parse(props.realizacaoAtividade)) : new Date(),
    })
    const [showModal, setShowModal] = React.useState(false)
    const [disabled, setDisabled] = React.useState<boolean>(
        !props.idAtividade || 
        !props.activeEmpresa ||
        !props.situacaoFinanceiro.active ||
        Boolean(props.obrigacao?.deletedAt)
    )


    React.useEffect(()=>{
        const check = async () =>{
            if(props.realizacaoAtividade)
                setStatus((status) => {return {...status, pendente: false}})
            else
                setStatus((status) => {return {...status, pendente: true}})
        }
        check()
        setDisabled(
            !props.idAtividade || 
            !props.activeEmpresa ||
            !props.situacaoFinanceiro.active ||
            Boolean(props.obrigacao?.deletedAt)
        )
    }, [props])

    const handleCheck = () =>{
        setShowModal(!showModal)
    }

    return (
        <div className='flex flex-col justify-center align-middle'>
            <input onChange={handleCheck}
                className={`place-self-center ${disabled && 'opacity-30'}`} 
                disabled={disabled} 
                type="checkbox" 
                checked={!status.pendente} 
                name={props.name}
            />
            <label className='whitespace-nowrap text-[10px]/[10px] text-slate-500'>{status.pendente ? '' : `${props.status} - ${status.date.getDate()}/${status.date.getMonth()+1}`}</label>
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