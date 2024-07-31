import React from 'react'
import FormInput from '../components/FormInput/FormInput';
import api from '../services/api';
import SelectInput from '../components/SelectInput/SelectInput';
import { AxiosResponse } from 'axios';
import ResponseModalComponent from './ResponseModalComponent';
import SelectIEInput from '../components/SelectInput/SelectIEInput';
interface props{
    setShowModal: Function
}

const AddCompanyModal = (props: props) => {
  const [regimes, setRegimes] = React.useState([])
  const [nameInput, setNameInput] = React.useState('')
  const [questorCodeInput, setQuestorCodeInput] = React.useState('')
  const [cnpjInput, setCnpjInput] = React.useState('')
  const [inscInput, setInscInput] = React.useState('')
  const [situacaoIEInput, setSituacaoIEInput] = React.useState('')
  const [representanteInput, setRepresentanteInput] = React.useState('')
  const [regimeInput, setRegimeInput] = React.useState('')
  const [response, setResponse] = React.useState<AxiosResponse>()
  const [showResponseModal, setShowResponseModal] = React.useState(false)

  const handleSubmit = ()=>{
    const data = {
      name: nameInput,
      active: true,
      codigoQuestor: questorCodeInput,
      cnpjEmpresa: cnpjInput,
      inscricaoEmpresa: inscInput,
      situacaoIE: situacaoIEInput,
      representante: representanteInput,
      idRegime: Number(regimeInput)
    }
    api
      .post('/empresa', data)
      .then(response => {
        setResponse(response)
        setShowResponseModal(true)
      })
      .catch(error=>{
        setResponse(error.response)
        setShowResponseModal(true)
      })
  }

  React.useEffect(()=>{
    api
      .get('/regime')
      .then(response=>{
        setRegimes(response.data)
      })
      .catch(err=>{
        console.log(err)
      })
  }, [])

  return (
      <>
        <div className="flex bg-transparent justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
            <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Adicionar Empresa</h3>
              </div>
              <div className="relative p-6 flex-auto overflow-y-scroll h-[320px]">
                <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <FormInput 
                    label='Nome'
                    type='text'
                    setInput={setNameInput}
                  />
                  <FormInput 
                    label='Código Questor'
                    type='text'
                    setInput={setQuestorCodeInput}
                  />
                  <FormInput 
                    label='CNPJ'
                    placeholder='00.000.000/0001-00'
                    type='text'
                    maskType='cnpj'
                    setInput={setCnpjInput}
                  />
                  <FormInput 
                    label='Inscrição Estadual (Opcional)'
                    type='text'
                    setInput={setInscInput}
                  />
                  <SelectIEInput 
                    label='Situação de IE'
                    options={['SERVICO', 'INABILITADA', 'HABILITADO']}
                    setInput={setSituacaoIEInput}
                  /> 
                  <FormInput 
                    label='Representante'
                    placeholder='000.000.000-00'
                    type='text'
                    maskType='cpf'
                    setInput={setRepresentanteInput}
                  />
                  <SelectInput 
                    label='Regime'
                    options={regimes}
                    setInput={setRegimeInput}
                  />  
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
                    Adicionar
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

export default AddCompanyModal