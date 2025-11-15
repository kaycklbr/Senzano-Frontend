import { MapPin, Menu, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return <header className="bg-Offwhite/80 text-dark-gray px-8 fixed w-full top-0 z-9999">
        <div className="flex w-full justify-between items-center py-4">
            <Link to="/">
            <img
              src="/images/logo.svg"
              alt="Senzano Logo"
              className="h-[40px] text-primary object-contain "
            />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 text-sm font-semibold">
              <Link to="/venda" className="relative pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Venda</Link>
              <Link to="/locacao" className="relative pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Locação</Link>
              <Link to="/empreendimentos" className="relative pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Empreendimentos</Link>
              <Link to="/lancamentos" className="relative pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"><span className="font-icomoon">S</span>ó lançamentos</Link>
              <Link to="/anuncie" className="relative pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Anuncie aqui</Link>
              <Link to="/fale-conosco" className="relative pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Fale conosco</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-Offwhite/80 font-semibold text-base border-t shadow-lg transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <nav className="flex flex-col space-y-4 px-8 py-4">
            <Link 
              to="/venda" 
              className="hover:text-primary transition-colors border-b border-black/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Venda
            </Link>
            <Link 
              to="/locacao" 
              className="hover:text-primary transition-colors border-b border-black/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Locação
            </Link>
            <Link 
              to="/empreendimentos" 
              className="hover:text-primary transition-colors border-b border-black/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Empreendimentos
            </Link>
            <Link 
              to="/lancamentos" 
              className="hover:text-primary transition-colors border-b border-black/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-icomoon text-sm">S</span>ó lançamentos
            </Link>
            <Link 
              to="/anuncie" 
              className="hover:text-primary transition-colors border-b border-black/10"
              onClick={() => setIsMenuOpen(false)}
            >
              Anuncie aqui
            </Link>
            <Link 
              to="/fale-conosco" 
              className="hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fale conosco
            </Link>
          </nav>
        </div>
      </header>
}