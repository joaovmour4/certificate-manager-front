import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import SearchBar from '../components/searchBar/SearchBar'
import api from '../services/api'
import ObrigacoesTable from '../components/ObrigacoesTable/ObrigacoesTable'
import { Obrigacao, Regime } from '../components/ActivitiesTable/ActivitiesTable'
import AddObrigacaoModal from '../modals/AddObrigacaoModal'
import loadingImg from '../img/loading.png'
import addObrigacaoImg from '../img/adicionar-obrigacao.png'
import { Setor } from '../App'

interface ObrigacaoRegime extends Obrigacao{
  Regimes: Array<Regime>
}
interface option{
  value: string
  name: string
}

const Obrigacoes = () => {
  const Auth = useAuth()
  const [search, setSearch] = React.useState('')
  const [filter, setFilter] = React.useState('all')
  const [setor, setSetor] = React.useState<string>(Auth.user?.Setor ? String(Auth.user.idSetor):'1')
  const [obrigacoes, setObrigacoes] = React.useState<Array<ObrigacaoRegime>>([])
  const [setores, setSetores] = React.useState<Array<Setor>>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [options, setOptions] = React.useState<Array<option>>([])
  const [loading, setLoading] = React.useState(true)

  const handleSetor = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setSetor(event.target.value)
  }

  React.useEffect(()=>{
    api
      .get('/regime')
      .then(response=>{
          setOptions([{value:'all', name:'Todos'}])
          for(const regime of response.data){
              setOptions(prevState=> [...prevState, {value: String(regime.idRegime), name: regime.regimeName}])
          }
      })
      .catch(err=>{
          console.log(err.response.message)
      })
    api
      .get('/setor')
      .then(response=>{
          setSetores(response.data)
      })
      .catch(err=>{
          console.log(err.response.message)
      })
  }, [])

  React.useEffect(()=>{
    const delayDebounceFn = setTimeout(()=>{
      api
      .get(`/obrigacao/true?filter=${filter}&search=${search}&setor=${setor}`)
      .then(response=>{
        setObrigacoes(response.data)
        setLoading(false)
      })
      .catch(error=>{
        console.log(error.response.message)
      })
    }, 300)

    return ()=> clearTimeout(delayDebounceFn)

  }, [search, filter, setor])

  return (
    <div className='flex-1'>
      <div className='flex flex-1 flex-col justify-start px-20 py-10 font-thin'>
            {(Auth.user?.cargo !== 'admin') &&
                <Navigate to='/' replace={true} />
            }
            <h1 className="text-3xl font-thin">Obrigações</h1>
            <div className="flex flex-row justify-between flex-wrap py-10">
                <div className='flex gap-x-5'>
                  <SearchBar
                      setSearch={setSearch}
                      setFilter={setFilter}
                      options={options}
                  />
                  {Auth.user?.cargo === 'admin' &&
                    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:shadow-md p-2.5 focus:outline-none divide-x divide-slate-300">
                      <select value={setor} className="flex-none bg-transparent font-thin focus:outline-none cursor-pointer select-none" onChange={handleSetor}>
                          {setores.map((option) => {
                              return (
                                  <option value={option.idSetor}>{option.setorName}</option>
                              )
                          })}
                      </select>
                    </div>
                  }
                </div>
                <button onClick={()=>setShowAddModal(true)} className="flex flex-row items-center gap-x-2 text-white text-sm font-normal rounded bg-green-600 px-5 py-1 place-self-end hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">
                    <img className='h-7' src={addObrigacaoImg} alt="" />
                    ADICIONAR OBRIGAÇÃO
                </button>
            </div>
            {loading && 
            <div className='flex justify-center'>
                <img src={loadingImg} className='animate-spin h-28 w-28' alt="" />
            </div>
            }
            {obrigacoes && !loading && <ObrigacoesTable obrigacoes={obrigacoes}/>}
            {showAddModal && setor && <AddObrigacaoModal setShowModal={setShowAddModal} idSetor={setor}/>}
        </div>
    </div>
  )
}

export type { ObrigacaoRegime }
export default Obrigacoes