import React from "react";

function headerButton(name: string){
    return(
        <a href="https://google.com" className='px-4 font-thin hover:font-medium'>{name}</a>
    )
}

export default headerButton