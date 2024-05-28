import React from 'react'
import api from '../../services/api'
interface props{
  idEmpresa: number
  active: boolean
  setActive: Function
}

const SelectActive = (props: props) => {

  const changeSelect = (event: any) => {
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
        <select onChange={changeSelect} name="" id="activeSelect" defaultValue={props.active ? "true":"false"} className='pl-1 bg-transparent text-sm focus:outline-none'>
            <option value='true'>Ativo</option>
            <option value='false'>S/M</option>
        </select>
    </>
  )
}

export default SelectActive