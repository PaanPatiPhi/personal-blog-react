
import { useState } from 'react';
import hamburgerIcon from '../assets/icon/hamburger_bar.png'; // แนะนำให้ import แบบนี้

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full border-b border-brown-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-50 py-4">
        
        <h4 className="font-bold text-2xl">
          Patiparn T<span className="text-(--color-brand-green)">.</span>
        </h4>

        {/* Hamburger Bar */}
        <div className='flex justify-evenly gap-x-2'>
        <button onClick={() => setIsOpen(!isOpen)}>
        <img 
          src={hamburgerIcon} 
          alt="menu" 
          className="w-6 h-6 object-contain md:hidden" 
        />
        </button>

        {/* Hamburger Bar script */}
        {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top duration-300 space-y-6 px-6 py-4 border-t md:hidden">
        <button className='w-full h-[48px] border-solid rounded-full border-black border-1 block  '>
          Log In
          </button>
        <button className='w-full h-[48px] border-solid rounded-full border-1 bg-black text-white block  '>
          Sign Up
          </button>
        </div>
      )}

      {/* button*/}
        <button className='w-[127px] h-[48px] border-solid rounded-full border-black border-1 md:block hidden '>
          Log In
          </button>
        <button className='w-[127px] h-[48px] border-solid rounded-full border-1 bg-black text-white md:inline hidden '>
          Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}


export default NavBar