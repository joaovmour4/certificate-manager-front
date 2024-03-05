import React from 'react';
import logoImg from '../../img/MG logo x7 - svg - ORIGINAL.svg'
import headerButton from '../headerButton/HeaderButton';

function Header() {
  return (
    <div className='flex flex-row relative bg-blue'>
      <img className='flex-none h-auto w-36' src={logoImg} alt="Logo MG" />
      <div className='flex flex-1 flex-row justify-end items-center justify-items-center pr-7'>
        {headerButton('Home')}
        {headerButton('Meus Certificados')}
        {headerButton('E-Mails')}
      </div>
    </div>
  );
}

export default Header;