import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../img/MG logo x7 - svg - ORIGINAL.svg'
import HeaderButton from '../headerButton/HeaderButton';

function Header() {
  return (
    <header className='flex items-center flex-col relative bg-blue shadow-md sm:flex-row'>
      <Link to={'/'}>
        <img className='h-auto w-36 sm:flex-none' src={logoImg} alt="Logo MG" />
      </Link>
      <div className='flex flex-1 flex-row flex-wrap justify-end items-center justify-items-center pr-7 divide-x divide-slate-300'>
        <Link to={'/'}><HeaderButton name="Início"/></Link>
        <Link to={'/atividades'}><HeaderButton name="Minhas Atividades"/></Link>
        <Link to={'/certificados'}><HeaderButton name="Meus Certificados"/></Link>
        <Link to={'/emails'}><HeaderButton name="E-Mails"/></Link>
      </div>
      <div>
        <Link className="border rounded border-slate-500 py-1 px-5 mr-5" to={'/login'}><HeaderButton name="Login" /></Link>
      </div>
    </header>
  );
}

export default Header;