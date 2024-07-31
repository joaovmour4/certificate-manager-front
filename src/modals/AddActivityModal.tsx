import React from "react";
import api from "../services/api";
import { AxiosError, AxiosResponse } from "axios";
import ResponseModal from "./ResponseModal";
import { Empresa, Obrigacao } from "../components/ActivitiesTable/ActivitiesTable";
import { Competencia } from "../views/MyActivities";

interface props{
  setor: string
  setShowModal: Function
}

const AddActivityModal = (props:props) => {
    const [obrigacoes, setObrigacoes] = React.useState<Array<Obrigacao>>([])
    const [competencias, setCompetencias] = React.useState<Array<Competencia>>([])
    const [competencia, setCompetencia] = React.useState<string>('')
    const [obrigacao, setObrigacao] = React.useState<string>('')
    const [empresas, setEmpresas] = React.useState<Array<Empresa>>([])
    const [empresa, setEmpresa] = React.useState<string>('')
    const [search, setSearch] = React.useState('')
    const [response, setResponse] = React.useState<AxiosResponse>()
    const [ShowResponseModal, setShowResponseModal] = React.useState(false)
    const [showSearchModal, setShowSearchModal] = React.useState(false)

    const handleSearchEmpresa = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
      if(event.target.value.length)
        setShowSearchModal(true)
      else
        setShowSearchModal(false)
    }
    const handleSelectEmpresa = (event: any) => {
      setEmpresa(event.target.value)
      setShowSearchModal(false)
    }
    const handleCompetencia = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCompetencia(event.target.value)
    }
    const handleObrigacao = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setObrigacao(event.target.value)
    }

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        const data = {
          idCompetencia: Number(competencia),
          idObrigacao: Number(obrigacao),
          idEmpresa: Number(empresa)
        }

        api.post(`/atividade`, data)
          .then((response) => {
            console.log(data)
            setResponse(response)
            setShowResponseModal(true)
            console.log(response.data.message)
          })
          .catch((error: AxiosError)=>{
            console.log(data)
            setResponse(error.response)
            setShowResponseModal(true)
          })
    
      }

    React.useEffect(()=>{

      const delayDebounceFn = setTimeout(()=>{
        api
        .get(`/empresa?filter=all&search=${search}&of=nameEmpresa&o=true`)
        .then((response: AxiosResponse) =>{
            setEmpresas(response.data)
        })
        .catch((error: AxiosError)=>{
            alert(error.message)
        })
      }, 300)

      api
        .get(`/obrigacao/true?filter=all&search=&setor=${props.setor}`)
        .then(response=>{
          setObrigacoes(response.data)
          setObrigacao(String(response.data[0].idObrigacao))
        })
        .catch(error=>{
          console.log(error.message)
        })
      api
        .get('/competencia')
        .then(response=>{
          setCompetencias(response.data)
          setCompetencia(String(response.data[response.data.length-1].idCompetencia))
        })
        .catch(error=>{
          console.log(error.message)
        })

      return ()=> clearTimeout(delayDebounceFn)

    }, [props, search])
    
    return (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="absolute w-1/3 my-6 mx-auto max-w-3xl">
              <div className="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Adicionar Atividade Única</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Empresa
                    </label>
                    {!empresa &&
                      <input 
                        onChange={handleSearchEmpresa} 
                        type="text"
                        className="w-full py-1 px-3 rounded-sm shadow focus:outline-none"
                      />
                    }
                    {empresa &&
                      <div className="w-full py-1 px-3 bg-white rounded-sm shadow focus:outline-none">
                        <div className="flex flex-row justify-between items-center max-w-[100%] rounded-sm px-1 bg-blue-table">
                          <p className="truncate">{empresas.find(reg => reg.idEmpresa === Number(empresa))?.nameEmpresa}</p>
                          <img onClick={() => setEmpresa('')} className='h-5 bg-red-500 rounded-sm cursor-pointer' alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQElEQVR4nO2ZQWrDMBBFfZQucpIESvZRsrCbs3fRM4RAEnglpKYO2CCPNaOR0d8ZjP5/GslI46apqqqqWpWADRAy+odnhqWDfADfwAM4J0sX738C7sCPGGYA0csUhn+IXjIY4PgXfqjnc6eS/N27m/A+ppoV9cqg5WkJg7aXBYzZhKFoZL6EUTDMsQ+TG2eDSBkgO0SKIG4glgRyByEJ5hZiTkD3EDFBi4GIOOxlOXwu0sTsl1GJGTDlQKwGhDUsLaAtfrOzhs8vr/v9WNCvwTu+YYiAcA/DDAi3MAgg3MHwamOKIDzdDsNSCA/39TBh3JXUQQmpIXL0tIIWhGWXMQA3TQiLvu9hAqJNll4bhvHldBe39tPcNFvJYJ/A1aoSEZW5ADvpYD2MKcQIjBxiMNg+88/QFtjm8q+qqqpqVPQL08n6GKXmFcYAAAAASUVORK5CYII="/>
                        </div>
                      </div>
                    }
                    {showSearchModal && 
                      <div className="absolute bg-white shadow">
                        {!empresas.length &&
                          <p className="py-1 px-3 text-gray-500 italic">A busca não retornou empresas.</p>
                        }
                        <ul>
                          {empresas.map(empresa=>{
                            return(
                              <li 
                                className="py-1 px-3 hover:bg-slate-200 cursor-pointer"
                                onClick={handleSelectEmpresa}
                                value={empresa.idEmpresa}
                              >
                                {empresa.nameEmpresa}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    }
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Competência
                    </label>
                    <select value={competencia} onChange={handleCompetencia} className="py-1 px-3 focus:outline-none">
                      {competencias.map((competencia: Competencia)=>{
                        return(
                          <option value={competencia.idCompetencia}>{`${competencia.mes}/${competencia.ano}`}</option>
                        )
                      })}
                    </select>
                    <label className="block text-black text-start text-sm font-bold mb-1 pl-1">
                      Obrigacao
                    </label>
                    <select value={obrigacao} onChange={handleObrigacao} className="py-1 px-3 focus:outline-none">
                      {obrigacoes.map((obrigacao: Obrigacao)=>{
                        return(
                          <option value={obrigacao.idObrigacao}>{obrigacao.obrigacaoName}</option>
                        )
                      })}
                    </select>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {props.setShowModal(false)}}
                  >
                    Fechar
                  </button>
                  <button
                      className="bg-blue active:bg-blue-active font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      onClick={handleSubmit}
                  >
                      Adicionar
                  </button>
                  {ShowResponseModal && response && 
                    <ResponseModal setShowAddModal={props.setShowModal} response={response} setShowModal={setShowResponseModal}/>}
                </div>
              </div>
            </div>
          </div>
        </>
    );
};

export default AddActivityModal;