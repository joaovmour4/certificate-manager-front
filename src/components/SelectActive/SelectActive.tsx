import React from 'react'
interface props{
  active: boolean
}

const SelectActive = (props: props) => {
  return (
    <>
        <select name="" id="activeSelect" defaultValue={props.active ? "active":"sm"} className='pl-1 bg-transparent rounded text-sm focus:outline-none'>
            <option value="active">Ativo</option>
            <option value="sm">S/M</option>
        </select>
    </>
  )
}

export default SelectActive