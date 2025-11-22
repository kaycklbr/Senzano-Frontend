import { Menu, MapPin, ChevronDown, Bed, Bath, Fullscreen } from "lucide-react";
import Button from "../../components/Button";
import PageMeta from "../../components/common/PageMeta";

export default function Venda() {
  return (
    <div className="w-full min-h-screen bg-white">
      <PageMeta title="Venda" description="Encontre imóveis para comprar" image="/images/fundo.webp" />
      
      {/* Hero Section with Search */}
      <section className="relative w-full h-[532px]">
        <img
          src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1760896857756-node-9%3A212-1760896856550.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-[1138px] bg-black/50 rounded-[20px] p-8">
            <h1 className="text-2xl font-medium text-white text-center mb-6">
              Encontre seu imóvel ideal
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Cidade */}
              <div className="relative">
                <div className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-between">
                  <span className="text-xl font-light text-[#7e7e7e]">
                    Cidade
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Bairro */}
              <div className="relative">
                <div className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-between">
                  <span className="text-xl font-light text-[#7e7e7e]">
                    Bairro
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Rua */}
              <div className="relative">
                <div className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-between">
                  <span className="text-xl font-light text-[#7e7e7e]">
                    Rua
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Quartos */}
              <div className="relative">
                <div className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-between">
                  <span className="text-xl font-light text-[#7e7e7e]">
                    Quartos
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Valor */}
              <div className="relative">
                <div className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-between">
                  <span className="text-xl font-light text-[#7e7e7e]">
                    Valor
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Tipo */}
              <div className="relative">
                <div className="bg-white rounded-[20px] px-4 py-2 flex items-center justify-between">
                  <span className="text-xl font-light text-[#7e7e7e]">
                    Tipo
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-[#6b1417] text-white rounded-[100px] px-16 py-3 text-[15px] hover:bg-[#8b1a1f] transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative overflow-hidden">
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="absolute top-3 left-3 rounded-full bg-primary-light text-xs px-3 py-1 text-white font-semibold">Venda</span>
                        <img src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1760896857756-node-9%3A212-1760896856550.png" />
                    </div>
                </div>
                
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Casa em Condomínio</h3>
                    <div className="text-xs mb-2 flex items-center gap-1 text-gray-600">
                        <MapPin size={14}/>
                        <span>Sobradinho, Brasília</span>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-600 mt-5">
                        <div className="flex items-center gap-1">
                            <Bed size={14}/>
                            <span>3 quartos</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath size={14}/>
                            <span>2 banheiros</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Fullscreen size={14}/>
                            <span>280m²</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <p className="text-2xl font-bold text-primary-light">R$ 850.000</p>
                        <Button size="md" bgColor="bg-primary-light hover:bg-primary" className="text-sm">
                            Ver detalhes
                        </Button>
                    </div>
                    
                </div>
            </div>

        </div>
      </section>
    </div>
  );
}
