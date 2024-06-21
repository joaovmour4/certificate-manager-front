import React from 'react'
interface props{
    clickFunction: React.MouseEventHandler<HTMLButtonElement>
    img: string
    name: string
}

const DropdownButton = (props: props) => {
  return (
    <li className='flex hover:bg-slate-200 px-3 py-1'>
        <button onClick={props.clickFunction} className='flex flex-1 items-center text-center'>
            <img src={props.img} alt="Empresas" className='h-[20px] pr-1'/>
            {props.name}
        </button>
    </li> 
  )
}

export default DropdownButton