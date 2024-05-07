import React from 'react'
import TaskConfirmModal from '../../modals/TaskConfirmModal'
interface props{
    name: string
    value: string
    regime: string
    cnpjEmpresa: string
}
interface status{
    pendente: boolean
    date: Date
}

const TaskCheckbox = (props: props) => {
    const [status, setStatus] = React.useState<status>({pendente: true, date: new Date()})
    const [showModal, setShowModal] = React.useState(false)
    const regimeTasks = {
        'Simples': ['dae', 'sped'],
        'Presumido': ['icms'],
        'Real': ['dief']
    }
    let findTask: string | undefined;

    const handleCheck = () =>{
        setShowModal(!showModal)
    }
    
    if(props.regime === 'Simples'){
        findTask = regimeTasks.Simples.find((task) => task === props.value)
    }else if(props.regime === 'Presumido'){
        findTask = regimeTasks.Presumido.find((task) => task === props.value)
    }else if(props.regime === 'Real'){
        findTask = regimeTasks.Real.find((task) => task === props.value)
    }

    if(findTask)
        return (
            <div className='flex flex-col'>
                <input onClick={handleCheck} type="checkbox" checked={!status.pendente} name={props.name} id={`${props.cnpjEmpresa};${props.value}`} />
                <label className='whitespace-nowrap text-[10px]/[10px] text-slate-500' htmlFor={props.value}>{status.pendente ? '' : `OK - ${status.date.getDay()}/${status.date.getMonth()}`}</label>
                {showModal && <TaskConfirmModal task={props.name} status={status} setStatus={setStatus} setShowModal={setShowModal}/>}
            </div>
        )
    else
        return (
            <div className='flex flex-col'>
                <input type="checkbox" disabled checked={!status.pendente} name={props.name} id={`${props.cnpjEmpresa};${props.value}`} />
                <label className='whitespace-nowrap text-[10px]/[10px] text-slate-500' htmlFor={props.value}>{status.pendente ? '' : `OK - ${status.date.getDay()}/${status.date.getMonth()}`}</label>
                {showModal && <TaskConfirmModal task={props.name} status={status} setStatus={setStatus} setShowModal={setShowModal}/>}
            </div>
        )
}

export type { status }
export default TaskCheckbox