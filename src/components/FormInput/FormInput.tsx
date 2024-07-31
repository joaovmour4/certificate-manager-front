import React from 'react'
import inputMask, { MaskTypes } from '../../utils/inputMask'
interface props extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string
    type: string
    value?: string
    setInput: Function
    placeholder?: string
    maskType?: MaskTypes
    inputType?: string
}

const FormInput = (props: props) => {
    const [modifyPassword, setModifyPassword] = React.useState(props.inputType === 'create'?true:false) 
    const handleModifyPassword = ()=>{
      setModifyPassword(prevState => !prevState)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.maskType) {
        const mask = inputMask[props.maskType];
        event.currentTarget.value = mask(event);
      }
  
      if (typeof props.onChange === 'function') {
        props.onChange(event);
        }
      props.setInput(event.currentTarget.value)
    }

    return (
        <>
            {(props.type === 'password' && props.inputType !== 'create') &&
              <label className='flex text-sm select-none pl-1'>
                <input type="checkbox" checked={modifyPassword} className='mr-1' onChange={handleModifyPassword}/>
                Alterar a senha
              </label>
            }
            {(props.type !== 'password' || (modifyPassword || props.inputType === 'create')) &&
              <>
                <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                  {props.label}
                </label>
                <input {...props} 
                  disabled={props.type === 'password' && !modifyPassword} 
                  type={props.type} 
                  placeholder={props.placeholder} 
                  value={props.value} 
                  onChange={handleChange} 
                  className="appearance-none border border-slate-300 rounded w-full py-2 px-1 file:rounded file:bg-blue focus:outline-none focus:shadow" 
                />
              </>
            }
        </>
    )
}

export default FormInput