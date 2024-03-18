import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SearchBar from "../components/searchBar/SearchBar";
import ValidTag from "../components/validTag/ValidTag";
import editar from '../img/editar.png'
import lixeira from '../img/lixeira.png'

interface Certificate{
    _id: string
    owner: string
    docOwner: string
    issuing: string
    valid: string
}

function Certificates(){
    const [arr, setArr] = useState<Array<Certificate>>([])
    const [search, setSearch] = useState('')
    const [asc, setAsc] = useState(true)
    const [filter, setFilter] = useState('all')

    function ordenateArr(responseArr: Array<Certificate>, ascending: boolean){
        responseArr.sort((a, b) => {
            const nameA = a.owner.toUpperCase()
            const nameB = b.owner.toUpperCase()
            if (nameA < nameB) {
              return ascending ? -1 : 1
            }
            if (nameA > nameB) {
              return ascending ? 1 : -1
            }
          
            // names must be equal
            return 0
          })

        return responseArr
    }

    function handleRemove(_id: string){
        api
            .delete(`/certificate/${_id}`)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    
    useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            api
                .get(`/certificate/'${search}'&${filter}`)
                .then(response => {
                    setArr(ordenateArr(response.data, asc))
                })
                .catch(err => {
                    console.error('Ocorreu um erro ao processar a requisição!')
                })
        }, 300)

        return ()=> clearTimeout(delayDebounceFn)
    }, [search, asc, filter])

    return(
        <div className="flex flex-col justify-between h-full w-full px-20 py-10 font-thin">
            <h1 className="flex-1 text-3xl pb-10">Certificados</h1>
            
            <div className="flex flex-row justify-between pb-10 flex-wrap">
                {SearchBar(setSearch)}
                <Link to={'/adicionarCertificado'} className="rounded-full bg-green-400 px-5 place-self-center">
                    Adicionar Certificado
                </Link>
            </div>

            <table className="flex-1 grow w-full table-auto text-center divide-y">
                <thead>
                    <tr>
                        <button className="flex justify-self-start" onClick={()=>{asc ? setAsc(false):setAsc(true)}}>
                            <th className="w-3/5 text-left pl-5">Nome</th>
                        </button>
                        <th>Emissão</th>
                        <th>Validade</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {arr.map((certificate: Certificate) =>{
                        return(
                            <tr>
                                <td>
                                    <div className="text-left flex flex-row pl-5">
                                        <p className="grow text-wrap">{certificate?.owner}</p>
                                        <p>{ValidTag(certificate?.valid)}</p>
                                    </div>
                                </td>
                                <td>{new Date(certificate?.issuing).toLocaleDateString('pt-BR')}</td>
                                <td>{new Date(certificate?.valid).toLocaleDateString('pt-BR')}</td>
                                {/* <div className="bg-blue justify-self-end">
                                    <td><img src={editar} alt="Editar" /></td>
                                    <td><button onClick={() => handleRemove(certificate?._id)}><img src={lixeira} alt="Excluir"/></button></td>
                                </div> */}
                                <td>edt</td>
                                <td>rmv</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Certificates