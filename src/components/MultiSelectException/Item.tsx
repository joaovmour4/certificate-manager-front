import React from 'react'
import { Excecao } from '../../views/Obrigacoes'
import api from '../../services/api'
import { Obrigacao } from '../ActivitiesTable/ActivitiesTable'
interface props{
    excecao: Excecao
    handleClick: Function
}

const Item = (props: props) => {
  return (
    <p className='flex flex-row justify-between pl-2 gap-x-1 bg-slate-200 rounded-sm max-h-5 items-center text-sm border'>
        {props.excecao.excecaoName}
        <span onClick={()=>{props.handleClick(props.excecao)}} className='flex px-0.5 rounded-sm bg-red-500 h-5 items-center cursor-pointer'>
            <img className='h-3' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQElEQVR4nO2ZQWrDMBBFfZQucpIESvZRsrCbs3fRM4RAEnglpKYO2CCPNaOR0d8ZjP5/GslI46apqqqqWpWADRAy+odnhqWDfADfwAM4J0sX738C7sCPGGYA0csUhn+IXjIY4PgXfqjnc6eS/N27m/A+ppoV9cqg5WkJg7aXBYzZhKFoZL6EUTDMsQ+TG2eDSBkgO0SKIG4glgRyByEJ5hZiTkD3EDFBi4GIOOxlOXwu0sTsl1GJGTDlQKwGhDUsLaAtfrOzhs8vr/v9WNCvwTu+YYiAcA/DDAi3MAgg3MHwamOKIDzdDsNSCA/39TBh3JXUQQmpIXL0tIIWhGWXMQA3TQiLvu9hAqJNll4bhvHldBe39tPcNFvJYJ/A1aoSEZW5ADvpYD2MKcQIjBxiMNg+88/QFtjm8q+qqqpqVPQL08n6GKXmFcYAAAAASUVORK5CYII="/>
        </span>
    </p>
  )
}

export default Item