import React from 'react'
import { Empresa } from '../ActivitiesTable/ActivitiesTable'
import CompaniesTableLine from '../CompaniesTableLine/CompaniesTableLine'
import loadingImg from '../../img/loading.png'
import AuthContext from '../../contexts/auth'
import { Setor } from '../../App'
import api from '../../services/api'
interface props{
    empresas: Array<Empresa>
    loading: boolean
}

const CompaniesTable = (props: props) => {
    const Auth = React.useContext(AuthContext)
    const [setores, setSetores] = React.useState<Array<Setor>>([])

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
            <img src={loadingImg} className='animate-spin' alt="" />
        )
    return (
        <table className='divide-y table-auto'>
            <thead>
            <tr>
                <th className='pl-5 text-left'>Nome</th>
                <th>Regime</th>
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
                        <CompaniesTableLine 
                            idEmpresa={empresa.idEmpresa}
                            name={empresa.nameEmpresa}
                            regime={empresa.Regime.regimeName}
                            active={empresa.activeEmpresa}
                            situacaoFinanceiro={empresa.situacaoFinanceiro}
                            empresa={empresa}
                            setores={setores}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default CompaniesTable