import React from 'react'
import FormInput from '../components/FormInput/FormInput';
import api from '../services/api';
import { AxiosResponse } from 'axios';
import ResponseModalComponent from './ResponseModalComponent';
import { Usuario } from '../components/ActivitiesTable/ActivitiesTable';
import { jwtDecode } from 'jwt-decode';
import { Setor, Token } from '../App';
interface props{
    setShowModal: Function
}
interface Data{
  username: string
  email: string
  login: string
  password?: string
  idSetor?: number
  cargo: string
}

const AddUserModal = (props: props) => {
  const [user, setUser] = React.useState<Usuario>()
  const [userNameInput, setUserNameInput] = React.useState('')
  const [emailInput, setEmailInput] = React.useState('')
  const [loginInput, setLoginInput] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')
  const [setorInput, setSetorInput] = React.useState<number>()
  const [cargoInput, setCargoInput] = React.useState('')
  const [response, setResponse] = React.useState<AxiosResponse>()
  const [showResponseModal, setShowResponseModal] = React.useState(false)
  const [setores, setSetores] = React.useState<Array<Setor>>([])
  const options = [
    {value:'operador', name: 'Operador'},
    {value:'supervisor', name: 'Supervisor'}
  ]
  if(user?.cargo === 'admin')
    options.push({value: 'admin', name: 'Administrador'})

  const handleCargo = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setCargoInput(event.target.value)
  }
  const handleSetor = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setSetorInput(Number(event.target.value))
  }

  const handleSubmit = ()=>{
    var data: Data = {
      username: userNameInput,
      email: emailInput,
      login: loginInput,
      password: passwordInput,
      cargo: cargoInput
    }
    if(user?.cargo === 'admin' && cargoInput !== 'admin')
      data = {
        ...data,
        idSetor: setorInput
      }
    api
      .post(`/user`, data)
      .then(response => {
        console.log(data, response)
        setResponse(response)
        setShowResponseModal(true)
      })
      .catch(error=>{
        console.log(data, error.response)
        setResponse(error.response)
        setShowResponseModal(true)
      })
  }

  React.useEffect(()=>{
    const token = localStorage.getItem('userToken')

    if(token){
      try{
        const decodedToken: Token = jwtDecode(token)
        setUser(decodedToken?.user)
      }catch(err){
        console.log(err)
      }
    }
    api
      .get('/setor')
      .then(response=>{
        setSetores(response.data)
      })
      .catch(error=>{
        console.log(error.response.message)
      })
  }, [])

  return (
      <>
        <div className="flex bg-transparent justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
            <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Adicionar Usuário</h3>
              </div>
              <div className="relative p-6 flex-auto overflow-y-scroll h-[320px]">
                <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <FormInput 
                    label='Nome'
                    type='text'
                    placeholder='Seu nome'
                    value={userNameInput}
                    setInput={setUserNameInput}
                  />
                  <FormInput 
                    label='Email'
                    type='email'
                    placeholder='exemplo@email.com'
                    value={emailInput}
                    setInput={setEmailInput}
                  />
                  <FormInput 
                    label='Login'
                    type='text'
                    value={loginInput}
                    setInput={setLoginInput}
                  />
                  <FormInput 
                    label='Senha'
                    type='password'
                    inputType='create'
                    setInput={setPasswordInput}
                  />
                  <div className='flex flex-col'>
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Cargo
                    </label>
                    <select onChange={handleCargo} defaultValue={'default'} className='items-start py-2 px-1 shadow rounded focus:outline-none'>
                      <option value="default" disabled></option>
                      {options.map(option=>{
                        return(
                          <option value={option.value}>{option.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  {user?.cargo === 'admin' && cargoInput !== 'admin' && 
                    <div className='flex flex-col'>
                      <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                        Setor
                      </label>
                      <select onChange={handleSetor} defaultValue={'default'} className='items-start py-2 px-1 shadow rounded focus:outline-none'>
                        <option value="default" disabled></option>
                        {setores.map(setor=>{
                          return(
                            <option value={setor.idSetor}>{setor.setorName}</option>
                          )
                        })}
                      </select>
                    </div>
                  }
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => {
                    props.setShowModal(false)
                  }}
                >
                  Fechar
                </button>
                <button
                    className="bg-blue active:bg-blue-active font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    onClick={handleSubmit}
                >
                    Confirmar
                </button>
              </div>
            </div>
          </div>
          {showResponseModal && response && 
            <ResponseModalComponent 
              setShowModal={setShowResponseModal}
              setShowAddModal={props.setShowModal}
              response={response}
            />}
        </div>
      </>
  );
}

export default AddUserModal