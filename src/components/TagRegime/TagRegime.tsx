import React from 'react'

interface props{
    regime: string
}

function TagRegime(props: props){
    return (
        <p className={`px-1 rounded select-none font-thin ${props.regime === 'Simples' ? 'bg-green-600':'bg-neutral-500'}  w-24 text-white text-center align-middle`}>{props.regime}</p>
    )
}

export default TagRegime