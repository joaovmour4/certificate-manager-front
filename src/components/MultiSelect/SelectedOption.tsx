import React from 'react'
import { Setor } from '../../App'
interface props{
    item: Setor
    setSelectedItems: Function
    setSelectedOpt: Function
    setShowConfirmModal: Function
}

const SelectedOption = (props: props) => {
    const removeItem = ()=>{
        props.setSelectedOpt(props.item)
        props.setShowConfirmModal({
            show: true,
            type: 'delete'
        })
    }
    return (
        <div className='flex justify-between bg-blue-table rounded text-sm shadow border mx-px'>
            <p className='px-1'>{props.item.setorName}</p>
            <span onClick={removeItem} className='bg-red-500 hover:bg-red-400 px-0.5 rounded flex items-center cursor-pointer'>
                <img className='h-3' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQElEQVR4nO2ZQWrDMBBFfZQucpIESvZRsrCbs3fRM4RAEnglpKYO2CCPNaOR0d8ZjP5/GslI46apqqqqWpWADRAy+odnhqWDfADfwAM4J0sX738C7sCPGGYA0csUhn+IXjIY4PgXfqjnc6eS/N27m/A+ppoV9cqg5WkJg7aXBYzZhKFoZL6EUTDMsQ+TG2eDSBkgO0SKIG4glgRyByEJ5hZiTkD3EDFBi4GIOOxlOXwu0sTsl1GJGTDlQKwGhDUsLaAtfrOzhs8vr/v9WNCvwTu+YYiAcA/DDAi3MAgg3MHwamOKIDzdDsNSCA/39TBh3JXUQQmpIXL0tIIWhGWXMQA3TQiLvu9hAqJNll4bhvHldBe39tPcNFvJYJ/A1aoSEZW5ADvpYD2MKcQIjBxiMNg+88/QFtjm8q+qqqpqVPQL08n6GKXmFcYAAAAASUVORK5CYII="/>
            </span>
        </div>
    )
}

export default SelectedOption