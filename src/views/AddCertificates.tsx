import React, { useState } from "react";
import api from "../services/api";

function AddCertificates(){
    const [file, setFile] = useState<File | null >(null)
    const [password, setPassword] = useState('')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setFile(event.target.files && event.target.files[0])
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>){
      setPassword(event.target.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('certFile', file!)
        formData.append('certPassword', password)

        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        api.post('/certificate', formData, config)
          .then((response) => {
            console.log(response.data.message)
          })
    
      }
    
    return(
        <div className="flex flex-col justify-between h-full w-full px-20 font-thin">
            <h1 className="text-3xl font-thin">Adicionar Certificado</h1>
            <form className="container flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
                <input type="file" className="file:rounded-md file:border-none file:bg-blue text-slate-500" onChange={handleChange} required/>
                {/* <div className="flex text-gray-400 w-1/2 h-32 rounded-lg border-dashed border-4 border-gray-400 hover:border-gray-500 bg-gray-100 hover:bg-gray-200 justify-center items-center">
                  <p><span className="font-bold">Clique para enviar</span> ou arraste até aqui</p>
                </div> */}
                <input type="password" className="px-1 border rounded-md placeholder:text-center focus:outline-none focus:shadow" placeholder="Senha do certificado" onChange={handlePassword} required/>
                <button className="px-5 rounded-full bg-blue place-self-end w-24" type="submit">Upload</button>
            </form>
        </div>
    )
}

export default AddCertificates