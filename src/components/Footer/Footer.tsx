import React from "react";
import { Link } from "react-router-dom";
import msgIcon from '../../img/msgIcon.png'
import instaIcon from '../../img/instaIcon.png'

function Footer(){
    return(
        <div className='flex flex-col items-center relative bg-blue shadow-md py-1 font-thin'>
            <div className='flex flex-none items-center justify-items-center pr-5'>
                <Link to={'mailto:contabilidade-maraba@hotmail.com'}><img className="pr-5" src={msgIcon} alt="Envie-nos um E-Mail" /></Link>
                <Link to={'https://instagram.com/mgcontabilidademba'}><img src={instaIcon} alt="Nos siga no Instagram" /></Link>
            </div>
            <div className="flex flex-1">
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Moura e Gagliardi Contabilidade™. Developed by <a className="underline" href="https://www.github.com/joaovmour4" rel="noreferrer" target="_blank">joaovmour4</a>. All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Footer