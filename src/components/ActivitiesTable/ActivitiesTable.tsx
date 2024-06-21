import React from 'react'
import { jwtDecode } from 'jwt-decode'
import ActivitiesTableLine from '../ActivitiesTableLine/ActivitiesTableLine'
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox'
import api from '../../services/api'
import SelectUserTable from '../SelectUserTable/SelectUserTable'
import loadingImg from "../../img/loading.png"
import { AxiosResponse } from 'axios'
import { Competencia } from '../../views/Activities'
import { Token } from '../../App'
import AuthContext from '../../contexts/auth'

interface props{
  search: string
  filter: string
  competencia: Competencia
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
interface Obrigacao{
  idObrigacao: number
  obrigacaoName: string,
  obrigacaoShortName: string
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
}
interface EmpresaAtividade{
  dataRealizacao: string | null
}


const ActivitiesTable = (props: props) => {
  const Auth = React.useContext(AuthContext)

  const [empresas, setEmpresas] = React.useState<Array<Empresa> | null>()
  const [tasks, setTasks] = React.useState<Array<Obrigacao> | null>()
  const [usuarios, setUsuarios] = React.useState<Array<Usuario>>([])


  React.useEffect(() => {

    const updateData = async () => {
      api
        .get(`/empresas/${props.filter}?nameEmpresa=${props.search}&mes=${props.competencia.mes}&ano=${props.competencia.ano}&user=${Auth.user?.idUsuario}`)
          .then((response: AxiosResponse) => {
            setEmpresas(response.data.empresas)
            props.setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })

      api
        .get('/obrigacao')
          .then((response: AxiosResponse) => {
            setTasks(response.data)
          })
          .catch((err) => {
            console.log(err)
          })
      api
        .get('/user')
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

  }, [Auth.user, props])

  if(props.loading)
    return(
      <img className="animate-spin place-self-center" src={loadingImg} alt="Carregando registros." />
    )

  if(empresas?.length === 0)
    return(
      <p className='text-center text-gray-500 italic'>
        Não há empresas cadastradas para o seu usuário.
      </p>
    )

  return (
    <div className='flex flex-row'>
      <table className='divide-y mb-3'>
        <thead>
          <tr>
            <th className='pl-5 text-left h-5'>Nome</th>
            <th>Regime</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
          {empresas && empresas.map((empresa)=>{
            return(
              <tr className='h-7 items-center'>
                <ActivitiesTableLine
                  idEmpresa={empresa.idEmpresa}
                  name={empresa.nameEmpresa}
                  active={empresa.activeEmpresa}
                  situacaoFinanceiro={empresa.situacaoFinanceiro}
                  regime={empresa.Regime.regimeName}
                  questorCode={empresa.codigoQuestor}
                  cnpj={empresa.cnpjEmpresa}
                  inscMunicipal={empresa.inscricaoEmpresa}
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
                return(
                  <th className='text-center divide-x whitespace-nowrap px-5'>{task.obrigacaoName}</th>
                )
              })}
            </tr>
          </thead>
          <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
            {empresas && tasks && empresas.map((empresa)=>{
              const taskEmpresa = tasks.map((task)=>{
                const find = empresa.Atividades.find((item) => item.idObrigacao === task.idObrigacao)
                return(
                    <td className='px-5 text-center'>
                      <TaskCheckbox
                        name={task.obrigacaoName}
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

export type {Usuario, Empresa, Regime, situacaoFinanceiro}
export default ActivitiesTable