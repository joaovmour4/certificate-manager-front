import React from "react";


function ValidTag(valid:boolean){
    return(
        <div className="py-1 px bg-green-600">
            <h1>{valid ? 'Válido':'Expirado'}</h1>
        </div>
    )
}

export default ValidTag