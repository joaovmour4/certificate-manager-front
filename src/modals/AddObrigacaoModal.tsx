import React from 'react'
import FormInput from '../components/FormInput/FormInput';
import api from '../services/api';
import { AxiosResponse } from 'axios';
import ResponseModalComponent from './ResponseModalComponent';
import { Regime } from '../components/ActivitiesTable/ActivitiesTable';
import MultiSelectNoConfirm from '../components/MultiSelect/MultiSelectNoConfirm';
import { Excecao } from '../views/Obrigacoes';
import MultiSelectRegime from '../components/MultiSelectRegime/MultiSelectRegime';
interface props{
    setShowModal: Function
    idSetor: string
}
interface Data{
  name: string
  shortName: string
  idRegime?: number
  regimes: string
  idSetor: number
  excecoes: string
}

const AddObrigacaoModal = (props: props) => {
  const [obrigacaoNameInput, setObrigacaoNameInput] = React.useState('')
  const [obrigacaoShortNameInput, setObrigacaoShortNameInput] = React.useState('')
  const [regimeInput, setRegimeInput] = React.useState<number>()
  const [response, setResponse] = React.useState<AxiosResponse>()
  const [showResponseModal, setShowResponseModal] = React.useState(false)
  const [regimes, setRegimes] = React.useState<Array<Regime>>([])
  const [selectedRegimes, setSelectedRegimes] = React.useState<Array<Regime>>([])
  const [excecoes, setExcecoes] = React.useState<Array<Excecao>>([])
  const [selectedExcecoes, setSelectedExcecoes] = React.useState<Array<Excecao>>([])

  const handleRegime = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setRegimeInput(Number(event.target.value))
  }

  const handleSubmit = ()=>{
    var data: Data = {
      name: obrigacaoNameInput,
      shortName: obrigacaoShortNameInput,
      idRegime: regimeInput,
      regimes: JSON.stringify(selectedRegimes.map(regime => regime.idRegime)),
      idSetor: Number(props.idSetor),
      excecoes: JSON.stringify(selectedExcecoes.map(excecao => excecao.idExcecao))
    }
    api
      .post(`/obrigacao`, data)
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
    api
      .get('/regime')
      .then(response=>{
        setRegimes(response.data)
      })
      .catch(error=>{
        console.log(error.response.message)
      })
    api
      .get('/excecao')
      .then(response=>{
        setExcecoes(response.data)
      })
      .catch(err=>{
        console.log(err.response.message)
      })
  }, [])

  return (
      <>
        <div className="flex bg-transparent justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
            <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Adicionar Obrigação</h3>
              </div>
              <div className="relative p-6 flex-auto overflow-y-scroll overflow-x-hidden h-[320px]">
                <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <FormInput 
                    label='Nome'
                    type='text'
                    placeholder='Nome da obrigação'
                    value={obrigacaoNameInput}
                    setInput={setObrigacaoNameInput}
                  />
                  <FormInput 
                    label='Nome curto'
                    type='text'
                    placeholder='Nome curto'
                    value={obrigacaoShortNameInput}
                    setInput={setObrigacaoShortNameInput}
                  />
                  <MultiSelectRegime
                    regimes={regimes}
                    selectedRegimes={selectedRegimes}
                    setSelectedRegimes={setSelectedRegimes}
                  />
                  <MultiSelectNoConfirm 
                    excecoes={excecoes}
                    selectedExcecoes={selectedExcecoes}
                    setSelectedExcecoes={setSelectedExcecoes}
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

export default AddObrigacaoModal