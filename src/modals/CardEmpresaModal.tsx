import React from 'react'
interface props{
    lineRef: React.RefObject<HTMLButtonElement>
    showModal: boolean
    setShowModal: Function
    name: string
    questorCode: number
    cnpj: string
    inscMunicipal: string
    representante: string
}

const CardEmpresaModal = (props: props) => {
  const appRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(()=>{
    
    const handleClickOutside = (event: Event) =>{
        if(appRef.current && !appRef.current.contains(event.target as Node) && !props.lineRef.current?.contains(event.target as Node))
            props.setShowModal(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () =>{
        document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [props])
  return (
    <div ref={appRef} className={`${props.showModal ? 'scale-100':'scale-0 invisible'} z-10 absolute border w-2/5 flex flex-col text-left font-thin bg-blue rounded-md shadow p-5 transition-all duration-200 ease-in-out`}>
        <p><span className='font-medium select-none'>Nome: </span>{props.name}</p>
        <p><span className='font-medium select-none'>Código Questor: </span>{props.questorCode}</p>
        <p><span className='font-medium select-none'>CNPJ: </span>{props.cnpj}</p>
        <p><span className='font-medium select-none'>Inscrição Municipal: </span>{props.inscMunicipal}</p>
        <p><span className='font-medium select-none'>Representante Legal: </span>{props.representante}</p>
    </div>
  )
}

export default CardEmpresaModal