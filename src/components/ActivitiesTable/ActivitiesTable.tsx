import React from 'react'
import ActivitiesTableLine from '../ActivitiesTableLine/ActivitiesTableLine'
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox'
import api from '../../services/api'
import SelectUserTable from '../SelectUserTable/SelectUserTable'
import loadingImg from "../../img/loading.png"
import upArrow from '../../img/up-arrow.png'
import downArrow from '../../img/down-arrow.png'
import { AxiosResponse } from 'axios'
import { Competencia } from '../../views/MyActivities'
import AuthContext from '../../contexts/auth'
import { SessionContextData, useSession } from '../../contexts/sessionContext'

interface props{
  search: string
  filter: string
  competencia: Competencia
  setor: string
  loading: boolean
  setLoading: Function
}
interface Empresa{
  idEmpresa: number
  nameEmpresa: string
  activeEmpresa: boolean
  Regime: Regime
  codigoQuestor: number
  cnpjEmpresa: string
  inscricaoEmpresa: string
  inscricaoMunicipal?: string
  situacaoIE: string
  representante: string
  idUsuarioResponsavel: number
  idRegime: number
  responsavel: Usuario
  Usuarios: Array<Usuario>
  Atividades: Array<Atividade>
  Setors?: Array<Setor>
  situacaoFinanceiro: situacaoFinanceiro
}
interface situacaoFinanceiro{
  active: boolean
  date: Date
}
interface Regime{
  idRegime: number
  regimeName: string
  Obrigacaos: Array<Obrigacao>
}
interface Usuario{
  idUsuario: number
  username: string
  login: string
  email: string
  cargo: string
  idSetor: number
  Setor?: Setor
  createdAt: Date
  updatedAt: Date
}
interface Setor{
  idSetor: number
  setorName: string
}
interface Atividade{
  idAtividade: number
  idObrigacao: number
  idCompetencia: number
  EmpresaAtividade: EmpresaAtividade
  Obrigacao: Obrigacao
}
interface Obrigacao{
  idObrigacao: number
  obrigacaoName: string
  obrigacaoShortName: string
  deletedAt: Date
}
interface EmpresaAtividade{
  dataRealizacao: string | null
}
interface OrderType{
  field: string | null
  ascending: boolean
}


const ActivitiesTable = (props: props) => {
  const Auth = React.useContext(AuthContext)
  const {searchParams, setSearchParams} = useSession()
  const [empresas, setEmpresas] = React.useState<Array<Empresa> | null>()
  const [tasks, setTasks] = React.useState<Array<Obrigacao> | null>()
  const [usuarios, setUsuarios] = React.useState<Array<Usuario>>([])
  const [isActual, setIsActual] = React.useState<boolean>()
  const [order, setOrder] = React.useState<OrderType>(searchParams.order)

  const handleNameAsc = () => {
    setOrder((prevState)=> {
      const option = {
        field: 'nameEmpresa',
        ascending: prevState.field === 'nameEmpresa' ? !prevState.ascending : true 
      }
      setSearchParams((prevState: SessionContextData) => {
        return {...prevState, 
          order: {
            option
          }
        }
      })
      return option
    })
    
  }
  const handleRegimeAsc = () => {
    setOrder((prevState)=> {
      const option = {
        field: 'regimeName',
        ascending: prevState.field === 'regimeName' ? !prevState.ascending : true 
      }
      setSearchParams((prevState: SessionContextData) => {
        return {...prevState,
          order: {
            option
          }
        }
      })
      return option
    })
  }

  React.useEffect(() => {  
    setIsActual(
      String(props.competencia.mes) === String(new Date().getMonth()+1) && 
      String(props.competencia.ano) === String(new Date().getFullYear())
    )

    const updateData = async () => {
      api
        .get(`/empresas/${props.filter}?nameEmpresa=${props.search}&mes=${props.competencia.mes}&ano=${props.competencia.ano}&user=${Auth.user?.idUsuario}&setor=${searchParams.setor}&of=${order.field}&o=${order.ascending}`)
          .then((response: AxiosResponse) => {
            setEmpresas(response.data.empresas)
            props.setLoading(false)
          })
          .catch((err) => {
            alert(err.message)
          })

      api
        .get(`/obrigacao/false?filter=all&search=&setor=${props.setor}`)
          .then((response: AxiosResponse) => {
            setTasks(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      api
        .get('/user?setor=all&search=')
          .then((response: AxiosResponse) => {
            setUsuarios(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
    }

    const interval = setInterval(updateData, 30000)
    const delayDebounceFn = setTimeout(updateData, 300)

    return ()=> {
      clearInterval(interval)
      clearTimeout(delayDebounceFn)
    }

  }, [Auth.user, props, isActual, order, searchParams.setor])

  if(props.loading)
    return(
      <img className="animate-spin place-self-center" src={loadingImg} alt="Carregando registros." />
    )
  
  if(!tasks?.length)
    return (
      <p className='text-center text-gray-500 italic'>
        Não há obrigações cadastradas, cadastre no menu Obrigações.
      </p>
    )

  if(empresas?.length === 0)
    return(
      <p className='text-center text-gray-500 italic'>
        Não há empresas cadastradas para o seu usuário.
      </p>
    )

  return (
    <div className='flex flex-row divide-x'>
      <table className='divide-y mb-3'>
        <thead>
          <tr>
            <th className='pl-5 text-left h-5'>
              <button onClick={handleNameAsc} className='flex flex-row justify-center items-center'>
                Nome
                {order.field === 'nameEmpresa' && 
                  <img className='h-3' src={order.ascending ? downArrow : upArrow} alt="" />
                }
              </button>
            </th>
            <th className='flex justify-center'>
              <button onClick={handleRegimeAsc} className='flex flex-row justify-center items-center'>
                Regime
                {order.field === 'regimeName' && 
                  <img className='h-3' src={order.ascending ? downArrow : upArrow} alt="" />
                }
              </button>
            </th>
            <th className='px-1'>Situação</th>
          </tr>
        </thead>
        <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
          {empresas && empresas.map((empresa)=>{
            return(
              <tr className='h-7 items-center'>
                <ActivitiesTableLine
                  empresa={empresa}
                  idEmpresa={empresa.idEmpresa}
                  name={empresa.nameEmpresa}
                  active={empresa.activeEmpresa}
                  situacaoFinanceiro={empresa.situacaoFinanceiro}
                  regime={empresa.Regime.regimeName}
                  questorCode={empresa.codigoQuestor}
                  cnpj={empresa.cnpjEmpresa}
                  inscEstadual={empresa.inscricaoEmpresa}
                  representante={empresa.representante}
                />
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='overflow-x-scroll scrollbar scrollbar-thin table-fixed flex-1'>
        <table className='divide-y w-full'>
          <thead>
            <tr className='h-5'>
              {tasks && tasks.map((task)=>{
                if(task.deletedAt && isActual)
                  return null
                return(
                  <th className='text-center divide-x whitespace-nowrap px-5'>{task.obrigacaoName}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
            {empresas && tasks && empresas.map((empresa)=>{
              const taskEmpresa = tasks.map((task)=>{
                if(task.deletedAt && isActual)
                  return null
                const find = empresa.Atividades.find((item) => item.idObrigacao === task.idObrigacao)
                return(
                  <td className='px-5 text-center'>
                    <TaskCheckbox
                      name={task.obrigacaoName}
                      obrigacao={task}
                      idAtividade={find?.idAtividade}
                      realizacaoAtividade={find?.EmpresaAtividade.dataRealizacao}
                      value={task.obrigacaoShortName}
                      idEmpresa={empresa.idEmpresa}
                      cnpjEmpresa={empresa.cnpjEmpresa}
                      regime={empresa.Regime.regimeName}
                      activeEmpresa={empresa.activeEmpresa}
                      situacaoFinanceiro={empresa.situacaoFinanceiro}
                      empresaTasks={empresa.Regime.Obrigacaos}
                    />
                  </td>
                )
              })
              return <tr className='h-7 w-[200px]'>{taskEmpresa}</tr>
            })}
          </tbody>
        </table>
      </div>
      {(Auth.user?.cargo === 'admin' || Auth.user?.cargo === 'supervisor') && 
      <SelectUserTable 
        Empresas={empresas!}
        Usuarios={usuarios!}
      />}
    </div>
  )
}

export type {Usuario, Empresa, Regime, situacaoFinanceiro, Obrigacao, Atividade}
export default ActivitiesTable