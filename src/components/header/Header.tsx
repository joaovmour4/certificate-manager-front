import React from 'react';
import logoImg from '../../img/MG logo x7 - svg - ORIGINAL 1.png'

function Header() {
  return (
    <div>
      <img className='object-contain h-20 w-30' src={logoImg} alt="Logo MG" />
      <div>
        <h1 className="flex justify-center text-3xl font-bold underline text-red-600">
            Texto de teste para ajustes de tamanho
        </h1>
        <h1 className="flex justify-center text-3xl font-bold underline text-red-600">
            Simple React Typescript Tailwind Sample
        </h1>
      </div>
    </div>
  );
}

export default Header;