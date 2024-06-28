import React from 'react'
import api from '../../services/api'
import { situacaoFinanceiro } from '../ActivitiesTable/ActivitiesTable'
interface props{
  idEmpresa: number
  active: boolean
  setActive: Function
  situacaoFinanceiro: situacaoFinanceiro
}

const SelectActive = (props: props) => {

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const act: boolean = event.target.value === 'true' ? true : false
    
    const data = {
      newStatus: act
    }
    api
      .patch(`/empresa/active/${props.idEmpresa}`, data)
        .then(() => {
          props.setActive(act)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <>
        <select disabled={!props.situacaoFinanceiro.active} onChange={changeSelect} name="" value={props.active ? "true":"false"} className={`z-0 pl-1 bg-transparent text-sm focus:outline-none cursor-pointer`}>
            <option value='true'>Ativo</option>
            <option value='false'>S/M</option>
        </select>
    </>
  )
}

export default SelectActive