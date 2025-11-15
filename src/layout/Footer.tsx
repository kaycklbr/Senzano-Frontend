import { MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer(){
    return <footer className="bg-dark-gray text-white py-16">
        <div className="mx-auto px-4 w-full max-w-6xl">
          <div className="flex flex-wrap gap-8 mb-8 w-full justify-between">
            <div className="flex flex-1 md:block flex-col items-center">
              <img
                src="/images/logo-w.svg"
                alt="Senzano Logo"
                className="h-[75px] object-contain mb-4"
              />
              <div className="md:block flex items-center flex-col space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  <div className="text-sm">
                    Rua Sebastião Lima, 455 - Jardim São Bento
                    <br />
                    Campo Grande - Mato Grosso do Sul
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer" className="bg-primary-light grid place-items-center rounded-full w-8 h-8">
                    <FaFacebookF className="text-white" />
                  </a>
                  <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer" className="bg-primary-light grid place-items-center rounded-full w-8 h-8">
                    <FaYoutube className="text-white" />
                  </a>
                  <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer" className="bg-primary-light grid place-items-center rounded-full w-8 h-8">
                    <FaWhatsapp className="text-white" />
                  </a>
                  <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer" className="bg-primary-light grid place-items-center rounded-full w-8 h-8">
                    <FaInstagram className="text-white" />
                  </a>
                  <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer" className="bg-primary-light grid place-items-center rounded-full w-8 h-8">
                    <FaTiktok className="text-white" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex gap-10 flex-wrap">
              <ul className="space-y-1 font-inter text-sm font-normal">
                <li><Link to="/venda">Venda</Link></li>
                <li><Link to="/locacao">Locação</Link></li>
                <li><Link to="/lancamentos">Lançamentos</Link></li>
                <li><Link to="/empreendimentos">Empreendimentos</Link></li>
                <li><Link to="/anuncie">Anuncie aqui</Link></li>
              </ul>

              <div>
                <ul className="space-y-1 font-inter text-sm font-normal">
                  <li><Link to="/quem-somos">Quem somos</Link></li>
                  <li><Link to="/politica-de-privacidade">Política de Privacidade</Link></li>
                  <li><Link to="/trabalhe-conosco">Trabalhe conosco</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-inter text-sm font-normal underline">Contatos</h4>
                <ul className="space-y-1 break-all text-sm">
                  <li>
                    <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer">
                      (67) 3044-1751 -{" "}
                      <span className="font-extrabold">Senzano</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer">
                      (67) 99841-0528 -{" "}
                      <span className="font-extrabold">Vendas</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer">
                      (67) 99958-9539 -{" "}
                      <span className="font-extrabold">Locação</span>
                    </a>
                  </li>
                  <li className="font-inter">
                    <a href="https://wa.me/5567998410528" target="_blank" rel="noopener noreferrer">
                      administracao@senzano.com.br
                    </a>
                  </li>
                </ul>
              </div>

            </div>


          </div>



          <div className="text-center mt-8 border-t border-white max-w-[80%] md:max-w-[60%] pt-6 mx-auto">
            <p className="font-poppins text-[11px] font-medium">
              © 2025 Senzano Empreendimentos Imobiliários. CRECI: 6847-J
              <br />
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
}