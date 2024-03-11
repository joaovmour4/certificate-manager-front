import React, { useState } from "react";
import axios from "axios";

function AddCertificates(){
    const [file, setFile] = useState()

    function handleChange(event: any) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event: any) {
        event.preventDefault()
        const url = 'http://localhost:3000/certificate';
        const data = {
            file: file
        }
        const config = {
          headers: {
            'content-type': 'application/json',
          },
        };
        axios.post(url, data, config).then((response) => {
          console.log(response.data);
        });
    
      }
    
    return(
        <div>
            <h1 className="text-3xl font-thin">Adicionar Certificado</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange}/>
                <button className="px-5 rounded-full bg-blue flex-none" type="submit">Upload</button>
            </form>
        </div>
    )
}

export default AddCertificates