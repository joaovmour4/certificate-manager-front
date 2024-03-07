import React, { Component } from "react";
import SearchBar from "../components/searchBar/SearchBar";

function Certificates(){
    const arr = [1, 2, 3, 4, 5, 6]
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
                    {arr.map(element =>{
                        return(
                            <tr>
                                <td className="text-left">João Vitor Moura {element}</td>
                                <td>10/10/2023</td>
                                <td>10/10/2024</td>
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