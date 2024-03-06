import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../img/MG logo x7 - svg - ORIGINAL.svg'
import headerButton from '../headerButton/HeaderButton';

function Header() {
  return (
    <header className='flex items-center flex-col relative bg-blue shadow-md sm:flex-row'>
      <Link to={'/'}>
        <img className='h-auto w-36 sm:flex-none' src={logoImg} alt="Logo MG" />
      </Link>
      <div className='flex flex-1 flex-row flex-wrap justify-end items-center justify-items-center pr-7'>
        <Link to={'/'}>{headerButton('Início')}</Link>
        <Link to={'/Certificates'}>{headerButton('Meus Certificados')}</Link>
        <Link to={'/Emails'}>{headerButton('E-Mails')}</Link>
      </div>
    </header>
  );
}

export default Header;