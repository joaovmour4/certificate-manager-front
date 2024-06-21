import React from 'react'
import mostrarSenha from '../../img/mostrar-senha.png'
import ocultarSenha from '../../img/ocultar-senha.png'
interface props{
    placeHolder: string
    setInput: Function
}
const PasswordInput = (props: props) => {
    const [visible, setVisible] = React.useState(false)

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
        event.preventDefault()
        props.setInput(event.target.value)
    }
    const handleVisibleSenha = () =>{
        setVisible(prevState => !prevState)
    }
    return (
        <div className='flex items-center w-1/3 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded px-5 my-1'>
        <input className="flex-1 focus:outline-none py-1 select-none bg-transparent" 
            onChange={handleInput}
            type={visible?'text':'password'}
            placeholder={props.placeHolder}
            required
        />
        {props.placeHolder === 'Senha' && 
            <img onClick={handleVisibleSenha} src={visible?ocultarSenha:mostrarSenha} alt="" className='h-6 focus:outline-none cursor-pointer'/>
        }
        </div>
    )
}

export default PasswordInput