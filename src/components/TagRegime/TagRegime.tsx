import React from 'react'

interface props{
    regime: string
}

function TagRegime(props: props){
    if(props.regime === 'Simples')
        return (
            <>
                <label className="px-5 rounded-full select-none bg-green-600 w-32 text-white text-center align-middle justify-center">{props.regime}</label>
            </>
        )
    else
        return (
            <>
                <label className="px-5 rounded-full select-none bg-yellow-600 w-32 text-white text-center align-middle justify-center">{props.regime}</label>
            </>
        )
}

export default TagRegime