import { Menu, MapPin } from "lucide-react";

export default function Sobre() {
  return (
    <div className="w-full min-h-screen bg-dark-gray">

      {/* Hero Section with Background */}
      <section className="relative w-full py-16 px-4 pt-24">
        <img
          src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1760902222395-node-9%3A52-1760902220852.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="font-poppins text-5xl font-black text-white mb-12">
            QUEM SOMOS
          </h1>

          <div className="text-white text-base font-poppins text-justify mb-16">
            <p className="mb-7">
              Fundada em 2011 como pessoa jurídica, a Senzano Empreendimentos
              Imobiliários iniciou sua história em 1982 com o patriarca e nosso
              maior vendedor/corretor:{" "}
              <span className="font-semibold">Marcelo Senzano.</span>
            </p>
            <p className="mb-7">
              Hoje, a Senzano se posiciona como um ecossistema de soluções no
              mercado imobiliário, voltada para a transparência e excelência no
              que tange ao desenvolvimento, gestão e comercialização de
              empreendimentos. Com sede em Campo Grande – MS, a empresa trabalha
              para ser referência no estado no ramo imobiliário, priorizando a
              qualidade no atendimento. Aqui, o cliente está sempre em primeiro
              lugar.
            </p>
            <p>
              Nossos gestores possuem experiência aliada a um perfil
              empreendedor, sempre em busca das melhores oportunidades e
              negócios que o mercado pode oferecer. Contamos também com equipes
              multidisciplinares qualificadas e credenciadas para garantir um
              desempenho superior em nossos resultados.
            </p>
          </div>

          {/* Mission, Purpose, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Missão */}
            <div className="flex flex-col items-center">
              <h2 className="font-poppins text-2xl font-black text-white mb-6">
                MISSÃO
              </h2>
              <div className="border-4 border-white rounded-[50px] p-6 h-[182px] flex items-center">
                <p className="font-poppins text-sm text-white text-center">
                  Manter uma relação transparente, sólida e de responsabilidade
                  com nossos clientes, proporcionando-lhes ótimas oportunidades
                  de investimentos imobiliários.
                </p>
              </div>
            </div>

            {/* Propósito */}
            <div className="flex flex-col items-center">
              <h2 className="font-poppins text-2xl font-black text-white mb-6">
                PROPÓSITO
              </h2>
              <div className="border-4 border-white rounded-[50px] p-6 h-[182px] flex items-center">
                <p className="font-poppins text-sm text-white text-center">
                  Democratizar o investimento imobiliário no{" "}
                  <span className="font-extrabold">Mato Grosso do Sul.</span>
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="flex flex-col items-center">
              <h2 className="font-poppins text-2xl font-black text-white mb-6">
                VISÃO
              </h2>
              <div className="border-4 border-white rounded-[50px] p-6 h-[182px] flex items-center">
                <p className="font-poppins text-sm text-white text-center">
                  Tornar-se reconhecida como uma das três maiores referências de
                  excelência em soluções imobiliárias do estado.
                </p>
              </div>
            </div>

            {/* Princípios e Valores */}
            <div className="flex flex-col items-center">
              <h2 className="font-poppins text-2xl font-black text-white whitespace-nowrap mb-6">
                PRINCÍPIOS E VALORES
              </h2>
              <div className="border-4 border-white rounded-[50px] p-6 h-[182px] flex items-center">
                <p className="font-poppins text-sm text-white text-center">
                  Respeito aos nossos clientes Trabalhar com ética no mercado
                  Democratizar o investimento imobiliário Excelência no
                  atendimento
                </p>
              </div>
            </div>
          </div>

          {/* Capacidades Section */}
          <h2 className="font-poppins text-5xl font-black text-white mb-12">
            CAPACIDADES
          </h2>

          <div className="space-y-8 text-white">
            <div>
              <h3 className="font-poppins text-2xl font-black mb-4">
                Vendas e Locação
              </h3>
              <p className="font-poppins text-base">
                Oferecemos uma equipe de corretores que atendem a todos os
                nichos, atrelada a processos, treinamentos e tecnologia, gerando
                uma previsibilidade maior de liquidez.
              </p>
            </div>

            <div>
              <h3 className="font-poppins text-2xl font-black mb-4">
                Coordenação Comercial
              </h3>
              <p className="font-poppins text-base">
                Gerenciamento de corretores e imobiliárias, treinando e
                estimulando para venda de empreendimentos, propiciando maior
                flexibilidade e liberdade ao incorporador.
              </p>
            </div>

            <div>
              <h3 className="font-poppins text-2xl font-black mb-4">
                Desenvolvimento Imobiliário
              </h3>
              <p className="font-poppins text-base">
                Analisamos e desenvolvemos para cada ativo imobiliário uma
                solução em forma de empreendimento, de acordo com os aspectos
                mercadológicos e demanda reprimida, gerando maior aproveitamento
                em rentabilidade.
              </p>
            </div>

            <div>
              <h3 className="font-poppins text-2xl font-black mb-4">
                Gestão Patrimonial
              </h3>
              <p className="font-poppins text-base">
                Gestão administrativa, cobrança e jurídica de todo e qualquer
                tipo de contrato de recebível imobiliário. Nesse braço,
                atendemos comercializadores, imobiliárias, corretores e Family
                Offices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
