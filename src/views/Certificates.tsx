import React, { useState, useEffect } from "react";
import api from "../services/api";
import SearchBar from "../components/searchBar/SearchBar";
import ValidTag from "../components/validTag/ValidTag";

interface Certificate{
    _id: string
    owner: string
    docOwner: string
    issuing: string
    valid: string
    isValid: boolean
}

function Certificates(){
    const [arr, setArr] = useState<Array<Certificate>>([])
    
    useEffect(()=>{
        api
            .get('/certificate')
            .then(response => {
                setArr(response.data)
            })
            .catch(err => {
                console.error('Ocorreu um erro ao processar a requisição!')
            })
    })

    return(
        <div className="flex flex-col justify-between h-full w-full px-20 font-thin">
            <h1 className="flex-1 text-3xl pb-10">Certificados</h1>
            
            {SearchBar()}

            <table className="flex-1 grow w-full table-auto text-center">
                <thead>
                    <tr>
                        <th className="w-3/5 text-left">Nome</th>
                        <th>Emissão</th>
                        <th>Validade</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((certificate: Certificate) =>{
                        return(
                            <tr>
                                <td className="text-left flex flex-col"><div>
                                        {certificate?.owner}
                                        {ValidTag(certificate?.isValid)}
                                    </div></td>
                                <td>{new Date(certificate?.issuing).toLocaleDateString('pt-BR')}</td>
                                <td>{new Date(certificate?.valid).toLocaleDateString('pt-BR')}</td>
                                <td>Editar</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Certificates