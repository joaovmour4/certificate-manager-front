import React from 'react'
import { Empresa } from '../ActivitiesTable/ActivitiesTable'
interface props{
    active: boolean
    empresa: Empresa
    setActive: Function
    setShowConfirmModal: Function
}

const SelectActiveFinanceiro = (props: props) => {

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        props.setShowConfirmModal(true)
    }

    return (
        <select value={`${props.active}`} onChange={handleSelect} className='bg-transparent text-sm focus:outline-none'>
            <option value="true">Ativo</option>
            <option value="false">Bloqueado</option>
        </select>
    )
}

export default SelectActiveFinanceiro