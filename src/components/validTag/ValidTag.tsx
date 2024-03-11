import React from "react";

function ValidTag(valid: string){
    if(Date.parse(valid) - new Date().valueOf() >= 0){
        return(
            <div className="w-24 px-2 bg-green-600 rounded-full text-center text-white">
                <h1>Válido</h1>
            </div>
        )
    }else{
        return(
            <div className="w-24 px-2 bg-red-600 rounded-full text-center text-white">
                <h1>Expirado</h1>
            </div>
        )
    }
}

export default ValidTag