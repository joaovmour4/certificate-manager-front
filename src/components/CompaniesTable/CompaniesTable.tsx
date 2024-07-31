import React from 'react'
import { Empresa } from '../ActivitiesTable/ActivitiesTable'
import CompaniesTableLine from '../CompaniesTableLine/CompaniesTableLine'
import loadingImg from '../../img/loading.png'
import upArrow from '../../img/up-arrow.png'
import downArrow from '../../img/down-arrow.png'
import AuthContext from '../../contexts/auth'
import { Setor } from '../../App'
import api from '../../services/api'
interface props{
    empresas: Array<Empresa>
    loading: boolean
    order: OrderOptions
    setOrder: Function
}
interface OrderOptions{
    field: string
    ascending: boolean
}

const CompaniesTable = (props: props) => {
    const Auth = React.useContext(AuthContext)
    const [setores, setSetores] = React.useState<Array<Setor>>([])

    const handleNameAsc = () => {
        props.setOrder((prevState: OrderOptions)=> {
            return({
                field: 'nameEmpresa',
                ascending: prevState.field === 'nameEmpresa' ? !prevState.ascending : true 
            })
        })
    }
    const handleRegimeAsc = () => {
        props.setOrder((prevState: OrderOptions)=> {
            return({
                field: 'regimeName',
                ascending: prevState.field === 'regimeName' ? !prevState.ascending : true 
            })
        })
    }

    React.useEffect(()=>{
        api
            .get('/setor')
            .then(response=>{
                setSetores(response.data)
            })
            .catch(err=>{
                console.log(err.response.message)
            })
    }, [])

    if(props.loading)
        return (
            <div className='flex justify-center'>
                <img src={loadingImg} className='animate-spin h-28 w-28' alt="" />
            </div>
        )
    return (
        <table className='divide-y table-auto'>
            <thead>
            <tr>
                <th className='pl-5 text-left'>
                    <button onClick={handleNameAsc} className='flex justify-center items-center'>
                        Nome
                        {props.order.field === 'nameEmpresa' && 
                            <img className='h-3' src={props.order.ascending ? downArrow : upArrow} alt="" />
                        }
                    </button>
                </th>
                <th className='flex justify-center'>
                    <button onClick={handleRegimeAsc} className='flex justify-center items-center'>
                        Regime
                        {props.order.field === 'regimeName' && 
                            <img className='h-3' src={props.order.ascending ? downArrow : upArrow} alt="" />
                        }
                    </button>
                </th>
                <th>Setores</th>
                {(Auth.user?.Setor?.setorName === 'Financeiro' || Auth.user?.cargo === 'admin') &&
                    <th>Bloquear</th>
                }
                <th>Ações</th>
            </tr>
            </thead>
            <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
                {props.empresas && props.empresas.map((empresa)=>{
                    return(
                        <tr>
                            <CompaniesTableLine 
                                idEmpresa={empresa.idEmpresa}
                                name={empresa.nameEmpresa}
                                regime={empresa.Regime.regimeName}
                                active={empresa.activeEmpresa}
                                situacaoFinanceiro={empresa.situacaoFinanceiro}
                                empresa={empresa}
                                setores={setores}
                            />
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CompaniesTable