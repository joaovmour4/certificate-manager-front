import React from 'react'
import { Regime } from '../ActivitiesTable/ActivitiesTable'
interface props{
    selectedRegimes: Array<Regime>
}

const MultiShowRegime = (props: props) => {
    return (
        <>
            <div className={`w-[250px] py-1 px-2 bg-white rounded border border-slate-300 text-gray-400`}>
                <div className='flex flex-row gap-x-2'>
                    {props.selectedRegimes.length ? 
                        props.selectedRegimes.map((regime:Regime)=>{
                            return(
                                <p className='bg-gray-200 text-black rounded px-2'>{regime.regimeName}</p>
                            )
                        })
                    : 
                        'Regimes'
                    }
                </div>
            </div>
        </>
    )
}

export default MultiShowRegime