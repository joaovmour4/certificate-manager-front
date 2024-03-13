import React, { useState } from "react";
import api from "../services/api";

function AddCertificates(){
    const [file, setFile] = useState<File | null >(null)
    const [password, setPassword] = useState('')

    function handleChange(event: any) {
      setFile(event.target.files[0])
    }

    function handlePassword(event: any){
      setPassword(event.target.value)
    }

    function handleSubmit(event: any) {
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
            console.log(response.data);
          })
    
      }
    
    return(
        <div>
            <h1 className="text-3xl font-thin">Adicionar Certificado</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} required/>
                <input type="password" onChange={handlePassword} required/>
                <button className="px-5 rounded-full bg-blue flex-none" type="submit">Upload</button>
            </form>
        </div>
    )
}

export default AddCertificates