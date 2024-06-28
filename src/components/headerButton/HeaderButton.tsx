import React from "react";

interface props{
    name: string
}

function HeaderButton({name}: props){
    return(
        <>
            <p className='px-4 font-thin select-none hover:text-slate-500'>{name}</p>
        </>        
    )
}

export default HeaderButton