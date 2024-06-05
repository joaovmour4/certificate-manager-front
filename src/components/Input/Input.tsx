import React from 'react'
interface props{
    placeHolder: string
    type: string
    setInput: Function
}
const Input = (props: props) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
    event.preventDefault()
    props.setInput(event.target.value)
  }
  return (
    <input className="w-1/3 h-10 bg-gray-50 select-none border border-gray-300 text-gray-900 text-sm rounded focus:outline-none px-5 py-1 my-1" 
      onChange={handleInput}
      type={props.type}
      placeholder={props.placeHolder}
      required
    />
  )
}

export default Input