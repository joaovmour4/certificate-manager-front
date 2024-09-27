import React from 'react';
import { Link } from 'react-router-dom';
// import logoImg from '../../img/MG logo x7 - svg - ORIGINAL.svg'
import logoImg from '../../img/Ativo 11Logo_Gagliardi.png'
import HeaderButton from '../headerButton/HeaderButton';
import ProfileButton from '../ProfileButton/ProfileButton';
import AuthContext from '../../contexts/auth';

function Header() {
  const Auth = React.useContext(AuthContext)
  if(Auth.signed && Auth.user) return (
    <header className='flex items-center flex-col py-2 pl-5 relative bg-blue shadow-md sm:flex-row'>
      <Link to={'/'}>
        <img className='h-auto w-36 sm:flex-none select-none' src={logoImg} alt="Logo MG" />
      </Link>
      <div className='flex flex-1 flex-row flex-wrap justify-end items-center justify-items-center pr-7 divide-x divide-slate-300'>
        <Link to={'/'}><HeaderButton name="Início"/></Link>
        <Link to={'/atividades'}><HeaderButton name="Minhas Atividades"/></Link>
        <Link to={'/certificados'}><HeaderButton name="Meus Certificados"/></Link>
        <Link to={'/emails'}><HeaderButton name="E-Mails"/></Link>
      </div>
      <div>
        <ProfileButton 
          user={Auth.user}
        />
      </div>
    </header>
  );
  return null
}

export default Header;