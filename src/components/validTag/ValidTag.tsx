import React from "react";

function ValidTag(valid: string){
    const actualDate = new Date()
    const validDate = new Date(valid)
    const thirtyDays = new Date(actualDate)
    thirtyDays.setDate(actualDate.getDate()+30)
    // console.log(thirtyDays.valueOf() >= validDate.valueOf())

    if(Date.parse(valid) - new Date().valueOf() >= 0 && validDate > thirtyDays){
        return(
            <div className="w-24 px-2 bg-green-600 rounded-full text-center text-white">
                <h1>Válido</h1>
            </div>
        )
    }else if(validDate <= thirtyDays && validDate > actualDate){
        return(
            <div className="w-24 px-2 bg-yellow-600 rounded-full text-center text-white">
                <h1>À Expirar</h1>
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