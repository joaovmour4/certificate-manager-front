import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import SearchBar from "../components/searchBar/SearchBar";
import ValidTag from "../components/validTag/ValidTag";

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
    
    useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{
            api
                .get(`/certificate/${search}`)
                .then(response => {
                    setArr(response.data)
                })
                .catch(err => {
                    console.error('Ocorreu um erro ao processar a requisição!')
                })
        }, 300)

        return ()=> clearTimeout(delayDebounceFn)
    }, [search])

    return(
        <div className="flex flex-col justify-between h-full w-full px-20 font-thin">
            <h1 className="flex-1 text-3xl pb-10">Certificados</h1>
            
            <div className="flex flex-row justify-between pb-10 flex-wrap">
                {SearchBar(setSearch)}
                <Link to={'/AddCertificate'} className="rounded-full bg-green-400 px-5 align-middle">
                    <p>Adicionar Certificado</p>
                </Link>
            </div>

            <table className="flex-1 grow w-full table-auto text-center divide-y">
                <thead>
                    <tr>
                        <th className="w-3/5 text-left pl-5">Nome</th>
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