import hamburgerIcon from '../assets/icon/hamburger_bar.png'; // แนะนำให้ import แบบนี้

function NavBar() {
  return (
    <nav className="w-full border-b border-brown-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        
        <h4 className="font-bold text-2xl">
          Patiparn T<span className="text-(--color-brand-green)">.</span>
        </h4>

        <button>
        <img 
          src={hamburgerIcon} 
          alt="menu" 
          className="w-6 h-6 object-contain" 
        />
        </button>
      </div>
    </nav>
  );
}


export default NavBar