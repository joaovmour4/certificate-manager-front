import React from 'react'
interface props{
    lineRef: any
    showModal: boolean
    setShowModal: Function
    name: string
    questorCode: number
    cnpj: string
    inscMunicipal: string
    representante: string
}

const CardEmpresaModal = (props: props) => {
  const appRef = React.useRef<HTMLInputElement>(null)
    React.useEffect(()=>{
        const handleClickOutside = (event: any) =>{
            if(appRef.current && !appRef.current.contains(event.target) && !props.lineRef.current.contains(event.target))
                props.setShowModal(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [props])
  return (
    <div ref={appRef} className={`${props.showModal ? 'scale-100':'scale-0 invisible'} absolute w-2/5 flex flex-col text-left font-thin bg-blue rounded-md shadow p-5 transition-all duration-200 ease-in-out`}>
        <p><span className='font-light'>Nome: </span>{props.name}</p>
        <p><span className='font-light'>Código Questor: </span>{props.questorCode}</p>
        <p><span className='font-light'>CNPJ: </span>{props.cnpj}</p>
        <p><span className='font-light'>Inscrição Municipal: </span>{props.inscMunicipal}</p>
        <p className='sticky'><span className='font-light'>Representante Legal: </span>{props.representante}</p>
    </div>
  )
}

export default CardEmpresaModal