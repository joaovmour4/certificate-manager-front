import React, { useState, useEffect } from "react";
import api from "../services/api";
import SearchBar from "../components/searchBar/SearchBar";
import ValidTag from "../components/validTag/ValidTag";
import EditCertificate from '../views/EditCertificate'
import AddCertificateModal from "../modals/AddCertificate";
import ResponseModal from "../modals/ResponseModal";
import { AxiosResponse } from "axios";

export interface Certificate{
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
    const [dateAsc, setDateAsc] = useState(false)
    const [filter, setFilter] = useState('all')
    const [owner, setOwner] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showResponseModal, setShowResponseModal] = useState(false)
    const [file, setFile] = useState<File | null >(null)
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState<AxiosResponse | null>(null)

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

    function ordenateDateArr(responseArr: Array<Certificate>, ascending: boolean){
        responseArr.sort((a, b) => {
            const valueA = Date.parse(a.valid)
            const valueB = Date.parse(b.valid)
            if (valueA < valueB) {
              return ascending ? -1 : 1
            }
            if (valueA > valueB) {
              return ascending ? 1 : -1
            }
          
            // names must be equal
            return 0
          })

        return responseArr
    }

    function handdleEdit(owner: string){
        setOwner(owner)
        setShowModal(true)
    }

    function handleRemove(_id: string){
        api
            .delete(`/certificate/${_id}`)
            .then(response => {
                setResponse(response)
                setShowResponseModal(true)
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
                    setArr(ordenateDateArr(response.data, dateAsc))
                })
                .catch(err => {
                    console.error('Ocorreu um erro ao processar a requisição!')
                })
        }, 300)

        return ()=> clearTimeout(delayDebounceFn)
    }, [arr, search, asc, dateAsc, filter])

    return(
        <div className="flex flex-col justify-between h-full w-full px-20 py-10 font-thin">
            <h1 className="flex-1 text-3xl pb-10">Certificados</h1>
            
            <div className="flex flex-row justify-between pb-10 flex-wrap">
                {SearchBar(setSearch)}
                <button onClick={() => setShowAddModal(true)} className="text-white rounded-full bg-green-600 px-5 place-self-center hover:bg-green-500 active:bg-green-600 shadow hover:shadow-lg">Adicionar Certificado</button>
            </div>

            <table className="flex-1 grow w-full table-auto text-center divide-y">
                <thead>
                    <tr>
                        <button className="flex justify-self-start" onClick={()=>{asc ? setAsc(false):setAsc(true)}}>
                            <th className="w-3/5 text-left pl-5">Nome</th>
                        </button>
                        <th>Emissão</th>
                        <button onClick={()=>{dateAsc ? setDateAsc(false):setDateAsc(true)}}>
                            <th className="w-3/5 text-left pl-5">Validade</th>
                        </button>
                    </tr>
                </thead>
                <tbody className="divide-y content-center">
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
                                <td className="flex justify-evenly content-center">
                                    <button onClick={() => {handdleEdit(certificate?.owner)}}><svg className="h-5 w-5 hover:fill-yellow-500" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/></svg></button>
                                    <button onClick={() => handleRemove(certificate?._id)}><svg className="h-5 w-5 hover:fill-red-500" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg></button>
                                    {showModal ? EditCertificate(setShowModal, owner, certificate?.docOwner, file, setFile, password, setPassword, setResponse, setShowResponseModal):null}
                                    {showAddModal ? AddCertificateModal(setShowAddModal, file, setFile, password, setPassword, setResponse, setShowResponseModal): null}
                                    {showResponseModal ? ResponseModal(setShowResponseModal, response):null}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Certificates