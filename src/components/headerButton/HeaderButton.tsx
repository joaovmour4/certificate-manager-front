import React from "react";
import loading from "../../img/loading.svg"

interface props{
    name: string
}

function HeaderButton({name}: props){
    return(
        <>
            <a href="https://google.com" className='px-4 font-thin select-none hover:text-slate-500'>{name}</a>
        </>        
    )
}

export default HeaderButton