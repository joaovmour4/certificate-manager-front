import React from 'react'
import { Competencia } from '../../views/MyActivities'
interface props{
    competencias: Array<Competencia>
    competencia: Competencia
    setCompetencia: Function
    setLoading: Function
}

const SelectCompetencia = (props: props) => {

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        const selected = props.competencias.find(arrayElement => arrayElement.idCompetencia === Number(event.target.value))
        props.setCompetencia(selected)
        window.sessionStorage.setItem('competencia', JSON.stringify(selected))
        props.setLoading(true)
    }

    return (
        <select value={props.competencia && props.competencia.idCompetencia} onChange={handleSelect} className="flex-none bg-transparent focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 p-2.5 focus:outline-none">
            {props.competencias.map((competencia) => {
                return (
                    <option value={competencia.idCompetencia}>
                        {competencia.mes}/{competencia.ano}
                    </option>
                )
            })}
        </select>
    )
}

export default SelectCompetencia