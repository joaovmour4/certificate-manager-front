import React from 'react'
interface props{
    name: string
    questorCode: number
    cnpj: string
    inscMunicipal: string
    representante: string
}

const CardEmpresaModal = (props: props) => {
  return (
    <div className='absolute w-2/5 flex flex-col text-left font-thin bg-blue rounded-md shadow p-5'>
        <p><span className='font-light'>Nome: </span>{props.name}</p>
        <p><span className='font-light'>Código Questor: </span>{props.questorCode}</p>
        <p><span className='font-light'>CNPJ: </span>{props.cnpj}</p>
        <p><span className='font-light'>Inscrição Municipal: </span>{props.inscMunicipal}</p>
        <p><span className='font-light'>Representante Legal: </span>{props.representante}</p>
    </div>
  )
}

export default CardEmpresaModal