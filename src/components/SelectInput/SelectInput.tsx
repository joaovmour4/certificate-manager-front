import React from 'react'
import { Regime } from '../ActivitiesTable/ActivitiesTable'
interface props{
    label: string
    setInput: Function
    options?: Array<Regime>
    value?: string
}

const SelectInput = (props: props) => {
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setInput(event.target.value)
    }
    return (
        <>
            <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
              {props.label}
            </label>
            <select onChange={handleSelectChange} defaultValue={'default'} value={props.value} className='focus:outline-none'>
                <option value="default" disabled></option>
                {props.options?.map(option=>{
                return <option key={option.idRegime} value={option.idRegime}>{option.regimeName}</option>
                })}
            </select>
        </>
    )
}

export default SelectInput