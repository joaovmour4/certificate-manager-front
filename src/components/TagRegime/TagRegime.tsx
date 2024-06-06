import React from 'react'

interface props{
    regime: string
}

function TagRegime(props: props){
    return (
        <label className={`px-1 rounded-full select-none font-thin bg-${props.regime === 'Simples' ? 'green':'yellow'}-600 w-24 text-white text-center align-middle justify-center`}>{props.regime}</label>
    )
}

export default TagRegime