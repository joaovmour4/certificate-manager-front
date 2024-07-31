import React from 'react'
interface props{
    label: string
    setInput: Function
    options?: Array<string>
    value?: string
}

const SelectIEInput = (props: props) => {
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
                return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </>
    )
}

export default SelectIEInput