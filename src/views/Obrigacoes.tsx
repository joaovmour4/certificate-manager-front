import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import SearchBar from '../components/searchBar/SearchBar'
import api from '../services/api'
import ObrigacoesTable from '../components/ObrigacoesTable/ObrigacoesTable'
import { Obrigacao, Regime } from '../components/ActivitiesTable/ActivitiesTable'
import AddObrigacaoModal from '../modals/AddObrigacaoModal'
import loadingImg from '../img/loading.png'

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
  const [obrigacoes, setObrigacoes] = React.useState<Array<ObrigacaoRegime>>([])
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [options, setOptions] = React.useState<Array<option>>([])
  const [loading, setLoading] = React.useState(true)

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
  }, [])

  React.useEffect(()=>{
    const delayDebounceFn = setTimeout(()=>{
      api
      .get(`/obrigacao/true?filter=${filter}&search=${search}`)
      .then(response=>{
        setObrigacoes(response.data)
        setLoading(false)
      })
      .catch(error=>{
        console.log(error.response.message)
      })
    }, 300)

    return ()=> clearTimeout(delayDebounceFn)

  }, [search, filter])

  return (
    <div className='flex-1'>
      <div className='flex flex-1 flex-col justify-start px-20 py-10 font-thin'>
            {(Auth.user?.cargo !== 'admin') &&
                <Navigate to='/' replace={true} />
            }
            <h1 className="text-3xl font-thin">Obrigações</h1>
            <div className="flex flex-row justify-between flex-wrap py-10">
                <SearchBar
                    setSearch={setSearch}
                    setFilter={setFilter}
                    options={options}
                />
                <button onClick={()=>setShowAddModal(true)} className="text-white rounded bg-green-600 px-5 place-self-end hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">
                    Adicionar Obrigação
                </button>
            </div>
            {loading && 
            <div className='flex justify-center'>
                <img src={loadingImg} className='animate-spin h-28 w-28' alt="" />
            </div>
            }
            {obrigacoes && !loading && <ObrigacoesTable obrigacoes={obrigacoes}/>}
            {showAddModal && <AddObrigacaoModal setShowModal={setShowAddModal}/>}
        </div>
    </div>
  )
}

export type { ObrigacaoRegime }
export default Obrigacoes