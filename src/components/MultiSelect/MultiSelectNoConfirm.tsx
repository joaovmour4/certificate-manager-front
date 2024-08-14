import React from 'react'
import { Excecao } from '../../views/Obrigacoes'
interface props{
    excecoes: Array<Excecao>
    selectedExcecoes: Array<Excecao>
    setSelectedExcecoes: Function
}

const MultiSelectNoConfirm = (props: props) => {
    const [onFocus, setOnFocus] = React.useState(false)
    const [showDropdown, setShowDropdown] = React.useState(false)
    const appRef = React.useRef<HTMLDivElement>(null)

    const handleClick = () => {
        setShowDropdown(prevState => !prevState)
        setOnFocus(true)
    }

    return (
        <>
            <p className='font-bold px-1'>Exceções</p>
            <div ref={appRef} onClick={handleClick} className={`flex flex-row justify-between items-center py-1 px-2 bg-white rounded w-full border border-slate-300 text-gray-400 ${onFocus && 'shadow'}`}>
                <div className='flex flex-row gap-x-2'>
                    {props.selectedExcecoes.length ? 
                        props.selectedExcecoes.map((excecao:Excecao)=>{
                            return(
                                <p className='bg-gray-200 text-black rounded px-2'>{excecao.excecaoName}</p>
                            )
                        })
                    : 
                        'Excecões'
                    }
                </div>
                <img className='h-3 w-3' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVR4nO3XSwqDMBRG4bOJG3T/O2lHfU3qoMtpETIQKSVqHjf0PyA48ML9zCiglFJKKaXUP3cC7kDAXwF4AOeUj6/AG5icYULcad7tkjJgwDMOvICx/I6bdxr2Do49Ijxh7CjCA8ZyIVpiLDeiBcZKIWpirDSiBqYaoiSmOqIEphkiJ6Y5IgfGDeIIxh1iD8YtYgvGPSIF0w3iF6Y7xLfb3LR693TrTGp5Ct2dxLr579/i091JKKWUUkophcs+GiV0FcyNP/cAAAAASUVORK5CYII="></img>
            </div>
            {showDropdown && props.excecoes &&
                <div className='absolute border shadow w-[70%] bg-white'>
                {props.excecoes.map(excecao=>{
                    if(props.selectedExcecoes.find((item: Excecao) => item.idExcecao === excecao.idExcecao))
                        return(
                            <p className='flex items-center justify-between px-3 bg-gray-200'
                                onClick={()=>{
                                    props.setSelectedExcecoes(
                                        props.selectedExcecoes.filter((item: Excecao) => item.idExcecao !== excecao.idExcecao)
                                    )
                                }}
                            >
                                {excecao.excecaoName}
                                <span className='flex px-0.5 rounded-sm bg-red-500 h-4 items-center cursor-pointer'>
                                    <img className='h-3' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQElEQVR4nO2ZQWrDMBBFfZQucpIESvZRsrCbs3fRM4RAEnglpKYO2CCPNaOR0d8ZjP5/GslI46apqqqqWpWADRAy+odnhqWDfADfwAM4J0sX738C7sCPGGYA0csUhn+IXjIY4PgXfqjnc6eS/N27m/A+ppoV9cqg5WkJg7aXBYzZhKFoZL6EUTDMsQ+TG2eDSBkgO0SKIG4glgRyByEJ5hZiTkD3EDFBi4GIOOxlOXwu0sTsl1GJGTDlQKwGhDUsLaAtfrOzhs8vr/v9WNCvwTu+YYiAcA/DDAi3MAgg3MHwamOKIDzdDsNSCA/39TBh3JXUQQmpIXL0tIIWhGWXMQA3TQiLvu9hAqJNll4bhvHldBe39tPcNFvJYJ/A1aoSEZW5ADvpYD2MKcQIjBxiMNg+88/QFtjm8q+qqqpqVPQL08n6GKXmFcYAAAAASUVORK5CYII="/>
                                </span>
                            </p>
                        )
                    else
                        return(
                            <p className='pl-3 hover:bg-gray-200'
                                onClick={()=>{
                                    props.setSelectedExcecoes((prevState: Array<Excecao>) => 
                                        [...prevState, excecao]
                                    )
                                }}
                            >
                                {excecao.excecaoName}
                            </p>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default MultiSelectNoConfirm