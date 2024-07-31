import React from 'react'
import ObrigacoesTableLine from '../ObrigacoesTableLine/ObrigacoesTableLine'
import { Excecao, ObrigacaoExcecao, ObrigacaoRegime } from '../../views/Obrigacoes'
interface props{
    obrigacoes: Array<ObrigacaoRegime>
    excecoes: Array<Excecao>
    relacaoExcecoes: Array<ObrigacaoExcecao>
}


const ObrigacoesTable = (props: props) => {
    if(!props.obrigacoes.length)
        return(
            <p className='text-center text-gray-500 italic'>Não há obrigações cadastradas.</p>
        )
    return (
        <table className='divide-y table-auto'>
            <thead>
            <tr>
                <th className='pl-5 text-left'>Nome</th>
                <th>Exceções</th>
                <th>Regime</th>
                <th className='w-28'>Ações</th>
            </tr>
            </thead>
            <tbody className='divide-y [&>*:nth-child(odd)]:bg-blue-table'>
                {props.obrigacoes && props.obrigacoes.map((obrigacao)=>{
                    return(
                        <ObrigacoesTableLine 
                            obrigacao={obrigacao}
                            excecoes={props.excecoes}
                            relacaoExcecoes={props.relacaoExcecoes}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

export default ObrigacoesTable