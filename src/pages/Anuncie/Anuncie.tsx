import {
  Menu,
  MapPin,
  Package,
  DollarSign,
  Award,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import Button from "../../components/Button";
import AnuncieForm from "./AnuncieForm";
import PageMeta from "../../components/common/PageMeta";

export default function Anuncie() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white">
      <PageMeta title="Anuncie aqui" description="Anuncie com a Senzano" image="/images/fundo.webp" />


      {/* Hero Section */}
      <section className="relative w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200">
        <img
          src="/images/senzano-out.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-[60px] px-4">
          <h1 className="text-4xl md:text-6xl break-all text-center font-black text-primary tracking-tight">
            ANUNCIE SEU IMÓVEL
          </h1>
          <p className="text-white" style={{textShadow: '0 1px 5px #000000aa'}}>COM QUEM ENTENDE DE IMÓVEL</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-base text-black text-justify leading-relaxed mb-8">
                Na Senzano, seu imóvel ganha atenção de verdade. Contamos com
                uma equipe especializada no mercado imobiliário de Campo Grande
                (MS) e uma estrutura de marketing preparada para alcançar quem
                realmente está procurando por um imóvel como o seu. Anunciar com
                a gente é fácil, rápido e totalmente digital. Seja residencial
                ou comercial, vender seu imóvel com a Senzano é ter mais
                visibilidade, agilidade e resultado.
              </p>

              <a href="https://wa.me/5567999589539" target="_blank">
                <Button>
                  ANUNCIE SEU IMÓVEL
                </Button>
              </a>
            </div>

            <div>
              <img
                src="/images/handshake.webp"
                alt="Business Meeting"
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Section */}
      <section className="px-4 rounded-[20px] mx-4 md:mx-16 relative flex items-center mt-0">
        <div className="hidden md:block bg-primary h-[60%] w-[140%] md:w-[150%] absolute -left-[50%] min-h-[200px] rounded-[20px]"></div>
        <div className="flex justify-center w-full z-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            <div className="hidden md:block">
              <img
                src="/images/thinking.webp"
                alt="Person Thinking"
                className="w-full h-[523px] object-cover rounded-lg shadow-[10px_10px_10px_0px_rgba(0,0,0,0.25)] border border-white"
              />
            </div>

            <div className="text-center bg-primary md:bg-transparent py-8 rounded-2xl px-4 text-sm md:text-lg">
              <h2 className="font-poppins  text-white mb-8">
                <span className="font-normal">Na dúvida de quanto</span>
                <span className="font-semibold"> cobrar no seu imóvel?</span>
                <br />
                <span className="font-normal">Faça uma </span>
                <span className="font-semibold">avaliação grátis </span>
                <span className="font-normal">com a </span>
                <span className="font-semibold">Senzano!</span>
              </h2>

              <button 
                onClick={() => setShowModal(true)}
                className="bg-white text-black rounded-[50px] px-8 py-2 border text-base hover:bg-primary hover:text-white transition-colors"
              >
                AVALIE AQUI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-primary mb-8">
            Anuncie direto com a Senzano
          </h2>

          <div className="max-w-3xl mx-auto">
            <AnuncieForm />
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-dark-gray/50 flex items-center justify-center z-99999">
          <div className=" rounded-lg w-full max-w-5xl h-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-dark-gray/40 hover:bg-dark-gray/80 rounded-full z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="calculadora flex w-full h-full justify-center items-center">
              <iframe 
                src="https://pricing-app.nivu.com.br/0944806e-b302-4d27-9763-55d2d79ecf41" 
                width="900px" 
                height="650px" 
                frameBorder="0"
                className="w-full max-w-full h-screen"
              >
                Seu navegador não suporta iframes.
              </iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
