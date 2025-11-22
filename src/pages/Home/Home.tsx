import { Search, MapPin, Users, Shield, ChevronRight } from "lucide-react";
import { FaFacebook, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import FeaturedPropertySection from './FeaturedPropertySection';
import Button from "../../components/Button";
import { Link } from "react-router";
import axios from "axios";
import PropertyCard from "../../components/PropertyCard";
import CustomSelect from "../../components/CustomSelect";
import CustomSearch from "../../components/CustomSearch";
import ContactForm from "../../components/ContactForm";
import ServiceItem from "../../components/ServiceItem";
import DestinationButtons from "../../components/DestinationButtons";
import { serviceItems } from "../../constants/homeComponents";
import { GoogleMap, Marker } from "@react-google-maps/api";
import CONFIG from "../../constants/config";
import { useConfig } from "../../context/ConfigContext";
import { getYouTubeVideoId } from "../../services/utils";
import PageMeta from "../../components/common/PageMeta";

// import Keys from '../../icons/keys.svg?react';
// import Gears from '../../icons/gears.svg?react';
// import Building from '../../icons/building.svg?react';
// import Sound from '../../icons/sound.svg?react';

export default function Home({ mapLoaded }) {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [ resume, setResume ] = useState();

  const fetchResume = async () => {
    try{
      const {data} = await axios.get(`${CONFIG.BASE_URL}/resume`);
      setResume(data);

    }catch(e){
      console.log(e)
    }
  }

  const { config, loading } = useConfig();

  useLayoutEffect(() => {
    fetchResume()
  }, [])

  // const propertyData = [
  //   {
  //     id: 1,
  //     image: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1759072635424-node-1%3A43-1759072634254.png",
  //     title: "RESIDENCIAL JARDIM EUROPA",
  //     content: "Empreendimento exclusivo localizado no coração da cidade, oferecendo apartamentos de alto padrão com acabamentos de primeira qualidade. Área de lazer completa com piscina, academia e salão de festas. Localização privilegiada próximo a shopping centers e escolas."
  //   },
  //   {
  //     id: 2,
  //     image: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1759072635424-node-1%3A43-1759072634254.png",
  //     title: "CONDOMÍNIO VILLA TOSCANA",
  //     content: "Casas em condomínio fechado com segurança 24h, área verde preservada e infraestrutura completa. Projeto arquitetônico inspirado no estilo toscano italiano, com jardins paisagísticos e clube privativo. Ideal para famílias que buscam tranquilidade e sofisticação."
  //   },
  //   {
  //     id: 3,
  //     image: "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1759072635424-node-1%3A43-1759072634254.png",
  //     title: "EDIFÍCIO METROPOLITAN",
  //     content: "Torre comercial moderna no centro financeiro da cidade, com salas corporativas de diversos tamanhos. Tecnologia de ponta, sistema de ar condicionado central e estacionamento amplo. Perfeito para empresas que valorizam localização estratégica e infraestrutura de qualidade."
  //   }
  // ];

  // const []


  return (
    <div className="w-full min-h-screen bg-white">
      <PageMeta image="/images/fundo.webp" />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-gray-300 px-4 flex flex-col items-center md:justify-center justify-end">
        <div
          className="cover-bg"
          style={{ backgroundImage: "url('/images/cover.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/70 to-transparent md:hidden" />
        </div>
        <div className="relative z-10 text-center text-white w-full md:w-auto md:px-10 self-center md:self-start">
          <h1 className="md:text-[32px] text-base font-normal tracking-[5.12px] mb-4">
            BEM-VINDO A SENZANO
          </h1>
          <h2 className="md:text-5xl text-4xl font-extrabold  tracking-wide text-center mb-8">
            SEU ECOSSISTEMA
            <br />
            IMOBILIÁRIO
          </h2>
          <div className="z-99">
            {/* Search Bar */}
            <CustomSearch
              />
            {/* <div className="bg-white rounded-[50px] p-4 flex items-center w-full mb-4">
              <input placeholder="O que você procura?" className="flex-1 text-center px-3 text-xl outline-0 text-black placeholder:text-gray-500" />
              <div className="w-9 h-9 flex items-center justify-center">
                <Search className="w-8 h-8 text-black" />
              </div>

            </div> */}

            {/* Category Buttons */}
            <div className="grid grid-cols-2 md:flex gap-4 justify-center mb-8 flex-wrap">
              <Link to="/venda" className="font-medium flex-1 bg-white rounded-[50px] px-5 py-3 text-xs md:text-sm text-black transition-all hover:bg-primary hover:text-white cursor-pointer">
                VENDA
              </Link>
              <Link to="/locacao" className="font-medium flex-1 bg-white rounded-[50px] px-5 py-3 text-xs md:text-sm text-black transition-all hover:bg-primary hover:text-white cursor-pointer">
                LOCAÇÃO
              </Link>
              <Link to="/empreendimentos" className="font-medium flex-1 bg-white rounded-[50px] px-5 py-3 text-xs md:text-sm text-black transition-all hover:bg-primary hover:text-white cursor-pointer">
                EMPREENDIMENTOS
              </Link>
              <Link to="/lancamentos" className="font-medium flex-1 bg-white rounded-[50px] px-5 py-3 text-xs md:text-sm text-black transition-all whitespace-nowrap text-left hover:bg-primary hover:text-white cursor-pointer flex justify-center">
              <span className="font-icomoon">S</span>Ó LANÇAMENTOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Desktop */}
          <div className="hidden md:flex gap-2 justify-around">
            {serviceItems.map((item) => (
              <div key={item.id} className="flex-1">
                <ServiceItem item={item} />
              </div>
            ))}
          </div>
          
          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                  return '<span class="' + className + ' hover:text-primary/20"></span>';
                },
              }}
              className="services-swiper"
            >
              {serviceItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <ServiceItem item={item} isMobile />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-black mb-4">
            <span className="font-bold">Senzano e EBS</span>: seu imóvel bem
            cuidado do início ao fim.
          </h3>

          <div className="gap-8 text-center space-y-10">
            <div className="flex flex-col justify-center relative">
              <div className="absolute bg-gray-100 left-[-100%] w-[100%] h-[50%]" />
              <div className="bg-gray-500 rounded-[15px] aspect-video z-1 overflow-hidden">
                {loading ? (
                  <div className="animate-pulse bg-gray-400 w-full h-full rounded-[15px]"></div>
                ) : (
                  config.video_ebs && <iframe id="ytplayer" className="w-full h-full"
                    src={'https://www.youtube.com/embed/' + getYouTubeVideoId(config.video_ebs) + '?rel=0'}></iframe>
                )}
              </div>
            </div>
            <div className="mt-4">
              <a href="https://ebsgestaopatrimonial.com.br/" target="_blank" className="bg-black rounded-[50px] px-8 py-4 text-base mb-8 transition-all hover:bg-primary text-white">
                Saiba mais sobre nossas soluções
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Property Section */}
      <section className="mt-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex lg:flex-row flex-col items-center">
            <div className="relative flex-1 lg:w-[45%] lg:max-w-[600px] w-full lg:ml-10">
              <div className="absolute left-[-30px] top-[-30px] z-10 lg:block hidden">
                <img src="/images/selo-senzano.svg" width="80" />
              </div>
              <Swiper
                ref={swiperRef}
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                  },
                }}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                className="featured-swiper w-full"
              >
                {resume?.lancamentos?.map((lancamento) => (
                  <SwiperSlide key={lancamento.id}>
                    <div className="bg-gray-300 lg:rounded-[15px]" style={{aspectRatio: 16/11, maxHeight: '400px', width: '100%'}}>
                      <img
                        src={lancamento.image_url}
                        alt={lancamento.title}
                        className="w-full h-full object-cover lg:rounded-[15px]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex-1 w-full lg:-mt-5 lg:mr-10">
              <div className="bg-gray-100 w-full flex flex-col px-10 py-5 lg:rounded-r-2xl">
                <h3 className="font-extrabold text-xl text-gray-800">
                <span className="font-icomoon">S</span>Ó LANÇAMENTOS
                </h3>
                <h3 className="text-2xl font-black text-primary mb-4 transition-all duration-500">
                  {resume?.lancamentos[activeSlide].title}
                </h3>
                <p className="text-sm text-black text-justify mb-6 line-clamp-3 transition-all duration-500" dangerouslySetInnerHTML={{__html: resume?.lancamentos[activeSlide].content}}>
                </p>
                {loading ? (
                  <div className="animate-pulse bg-gray-300 rounded-3xl h-10 w-48 mx-auto"></div>
                ) : (
                  config?.whatsapp_lais && <a href={`https://wa.me/55${config?.whatsapp_lais.replace(/\D+/g, '')}`} target="_blank">
                    <button className="bg-primary text-white rounded-3xl px-6 py-2 flex self-center items-center gap-2">
                      <FaWhatsapp size={24} />
                      <span className="font-semibold">
                        Fale com um consultor
                      </span>
                    </button>
                  </a>
                )}

                <div className="flex gap-2 justify-center mt-4 lg:hidden">
                  {Array.from({ length: resume?.lancamentos.length }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => swiperRef.current?.swiper.slideTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${activeSlide === index ? 'bg-primary' : 'bg-primary/30'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <FeaturedPropertySection /> */}

      {/* Plantão Senzano */}
      <section className="bg-primary mb-8 py-6 md:py-8 mt-16 flex justify-center">
        <div className="max-w-6xl px-4 flex items-center flex-wrap justify-between gap-3 flex-1">
          <div className="text-center text-white flex-1">
            <h4 className="md:text-5xl text-2xl font-bold whitespace-nowrap mb-0">
              PLANTÃO SENZANO
            </h4>
            <p className="md:text-lg text-[9px] font-bold  whitespace-nowrap">
              FALE COM UM CORRETOR QUANDO E ONDE PRECISAR
            </p>
          </div>
          <a href="https://api.whatsapp.com/send?phone=5567998777583" target="_blank" className="block text-white text-center flex-1 whitespace-nowrap">
            <span className="md:text-3xl text-lg font-bold">
              67{" "}
            </span>
            <span className="md:text-6xl text-2xl font-bold  whitespace-nowrap">
              99877-7583
            </span>
          </a>
        </div>
      </section>

      {/* About Section 2 */}
      <section className="py-8">
        <div className="flex lg:flex-row flex-col mx-auto">
          <div className="flex-1 w-full mt-8">
            <div className="hidden lg:block text-black lg:ml-10 px-10">
              <p className="text-lg font-medium mb-4">
                Mais do que um imóvel:{" "}
                <span className="font-bold">um espaço pensado para você.</span>
              </p>
            </div>
            <div className="extra-bg relative lg:ml-10 bg-primary lg:rounded-l-2xl text-white text-sm w-full flex flex-col px-10 py-8">
              <p className="lg:hidden text-lg font-medium mb-4">
                Mais do que um imóvel:{" "}
                <span className="font-bold">um espaço pensado para você.</span>
              </p>
              <p className="">
                Aqui temos o imóvel ideal para sua família ou empresa!
              </p>
              <div className="hidden lg:block">
                <DestinationButtons />
              </div>
              <p className="hidden lg:block text-sm">
                Encontre o imóvel perfeito na Senzano e garanta conforto,
                praticidade e segurança para sua família ou empresa. Estrutura
                de qualidade, localização estratégica e tudo o que você precisa
                para viver ou empreender bem!
              </p>

              <div className="flex gap-2 justify-center mt-4 lg:hidden">
                {Array.from({ length: resume?.destaque.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => swiperRef.current?.swiper.slideTo(index)}
                    className={`w-2 h-2 rounded-full transition-all ${activeSlide === index ? 'bg-primary' : 'bg-primary/30'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex flex-col flex-1 lg:w-[50%] lg:max-w-[650px]  w-full lg:mr-14">
            <Swiper
              ref={swiperRef}
              modules={[Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return '<span class="' + className + '"></span>';
                },
              }}
              // onSlideChange={(swiper) => setActiveDestaqueSlide(swiper.activeIndex)}
              className="featured-swiper w-full"
            >
              {!resume ? (
                Array(3).fill(0).map((_, i) => (
                  <SwiperSlide key={i}>
                    <div className="animate-pulse bg-gray-300 lg:rounded-[15px]" style={{aspectRatio: 16/10, maxHeight: '400px', width: '100%'}}>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                resume?.destaque.map((property) => (
                  <SwiperSlide key={property.id}>
                    <div className="bg-gray-300 lg:rounded-[15px]" style={{aspectRatio: 16/10, maxHeight: '400px', width: '100%'}}>
                      <img
                        src={property.cover_photo.split(',')[0]}
                        alt={property.title}
                        className="w-full h-full object-cover lg:rounded-[15px]"
                      />
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
            {loading ? (
              <div className="animate-pulse bg-gray-300 rounded-full h-12 w-48 self-end hidden lg:block mt-2"></div>
            ) : (
              config?.whatsapp_lais && <a href={`https://wa.me/55${config?.whatsapp_lais.replace(/\D+/g, '')}`} target="_blank">
                <button className="self-end hidden lg:flex mt-2 items-center">
                  <div className="bg-[#25D366] rounded-full -mr-6 z-9 p-3 text-white">
                  <FaWhatsapp size={24} />
                  </div>
                  <span className="bg-white shadow-lg py-2 pl-8 pr-3 rounded-full font-semibold text-primary">
                    Fale com um consultor
                  </span>
                </button>
              </a>
            )}
          </div>
          <div className="lg:hidden text-white bg-primary px-10 py-8 relative flex flex-col items-center">
            <DestinationButtons isMobile />
            <p className="text-sm">
              Encontre o imóvel perfeito na Senzano e garanta conforto,
              praticidade e segurança para sua família ou empresa. Estrutura
              de qualidade, localização estratégica e tudo o que você precisa
              para viver ou empreender bem!
            </p>
          </div>
          {/* <div className="flex-1 w-full lg:-mt-10">
              <div className="bg-gray-100 w-full flex flex-col px-10 py-5">
                <h3 className="text-2xl font-black text-[#d41a22] mb-4 transition-all duration-500">
                  {currentProperty.title}
                </h3>
                <p className="text-sm text-black text-justify leading-7 mb-6 line-clamp-5 transition-all duration-500">
                  {currentProperty.content}
                </p>
                <button className="bg-[#d41a22] text-white rounded-3xl px-6 py-2 flex self-center items-center gap-2">
                  <FaWhatsapp size={24}/>
                  <span className="font-semibold">
                    Fale com um consultor
                  </span>
                </button>
                
                <div className="flex gap-2 justify-center mt-4 lg:hidden">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => swiperRef.current?.swiper.slideTo(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeSlide === index ? 'bg-[#d41a22]' : 'bg-[#d41a22]/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div> */}
        </div>
        {/* <div className="mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h3 className="text-[28px] font-medium mb-4">
                Mais do que um imóvel:{" "}
                <span className="font-bold">um espaço pensado para você.</span>
              </h3>
              <p className="text-base mb-6">
                Aqui temos o imóvel ideal para sua família ou empresa!
              </p>
              <p className="text-base leading-[31px]">
                Encontre o imóvel perfeito na Senzano e garanta conforto,
                praticidade e segurança para sua família ou empresa. Estrutura
                de qualidade, localização estratégica e tudo o que você precisa
                para viver ou empreender bem!
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-white rounded-[50px] px-6 py-2 text-base text-black">
                  Comercial
                </button>
                <button className="bg-white rounded-[50px] px-6 py-2 text-base text-black">
                  Residencial
                </button>
              </div>

              <div className="flex gap-2 mt-8">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              </div>
            </div>
            <div className="bg-gray-500 rounded-[15px] h-[533px]">
            </div>
          </div>
        </div> */}
      </section>

      {/* Property Highlights - Venda */}
      {!!resume?.venda?.length &&
      <section className="pt-8">
        <div className="mx-auto">
          <h3 className="text-4xl font-light mb-4 px-4">
            DESTAQUES <span className="font-black text-primary-light">VENDA</span>
          </h3>

          <div className="py-8 mb-8 relative flex items-center">
            <div className="bg-primary absolute left-0 w-full h-[60%] z-0"></div>
            <div className="px-8 z-100 w-full mx-auto">
              <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                pagination={{
                  clickable: true,
                }}
                className="property-highlights-swiper w-full"
                style={{
                  '--swiper-pagination-color': '#d41a22',
                  '--swiper-pagination-bullet-inactive-color': '#d41a22',
                  '--swiper-pagination-bullet-inactive-opacity': '0.3'
                } as React.CSSProperties}
              >
                {!resume ? (
                  Array(3).fill(0).map((_, i) => (
                    <SwiperSlide key={i} className="pb-8">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
                        <div className="p-4 space-y-2">
                          <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded"></div>
                          <div className="animate-pulse bg-gray-300 h-3 w-1/2 rounded"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  resume?.venda?.map((property) => (
                    <SwiperSlide key={property.id} className="pb-8">
                      <PropertyCard
                        id={property.id}
                        slug={property.slug}
                        title={property.title}
                        address={property.address}
                        neighborhood={property.neighborhood}
                        cover_photo={property.cover_photo}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      }

      {!!resume?.locacao?.length &&
      <section className="pt-0">
        <div className="mx-auto">
          <h3 className="text-4xl font-light mb-4 px-4">
            DESTAQUES <span className="font-black text-primary-light">LOCAÇÃO</span>
          </h3>

          <div className="py-8 mb-8 relative flex items-center">
            <div className="bg-primary absolute left-0 w-full h-[60%] z-0"></div>
            <div className="px-8 z-100 w-full mx-auto">
              <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                pagination={{
                  clickable: true,
                }}
                className="property-highlights-swiper"
                style={{
                  '--swiper-pagination-color': '#d41a22',
                  '--swiper-pagination-bullet-inactive-color': '#d41a22',
                  '--swiper-pagination-bullet-inactive-opacity': '0.3'
                } as React.CSSProperties}
              >
                {!resume ? (
                  Array(3).fill(0).map((_, i) => (
                    <SwiperSlide key={i} className="pb-8">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
                        <div className="p-4 space-y-2">
                          <div className="animate-pulse bg-gray-300 h-4 w-3/4 rounded"></div>
                          <div className="animate-pulse bg-gray-300 h-3 w-1/2 rounded"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  resume?.locacao?.map((property) => (
                    <SwiperSlide key={property.id} className="pb-8">
                      <PropertyCard
                        id={property.id}
                        slug={property.slug}
                        title={property.title}
                        address={property.address}
                        neighborhood={property.neighborhood}
                        cover_photo={property.cover_photo}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      }

      {/* Advertise Section */}
      <section className="pb-16 px-4 border-b-2 border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Anuncie seu Imóvel</h3>
          <p className="text-lg mb-8 max-w-2xl font-light mx-auto">
            Conte com nossa expertise para vender ou alugar seu imóvel com
            agilidade e segurança. Nosso time especializado cuida de tudo para
            você obter o melhor resultado.
          </p>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold mb-2">Análise Gratuita</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold mb-2">Marketing Profissional</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold mb-2">Suporte Jurídico</h4>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/anuncie" className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-3">
              QUERO ANUNCIAR
              <ChevronRight size={18}/>
            </Link>
          </div>
        </div>
      </section>

      {/* LGPD Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          
          {!resume ? (
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className={i%2 != 0 ? 'order-1' : ''}>
                  <div className="animate-pulse bg-gray-300 h-8 w-3/4 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
                    <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded"></div>
                    <div className="animate-pulse bg-gray-300 h-4 w-4/5 rounded"></div>
                  </div>
                  <div className="animate-pulse bg-gray-300 h-10 w-32 rounded"></div>
                </div>
                <div>
                  <div className="animate-pulse bg-gray-300 w-full h-[362px] rounded-[46px]"></div>
                </div>
              </div>
            ))
          ) : (
            resume?.pages?.map((p, i) => 
              <div key={p.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className={i%2 != 0 ? 'order-2 md:order-1' : 'order-2 md:-order-1'}>
                  <h3 className="text-2xl font-medium text-primary mb-4">
                    {p.title}
                  </h3>
                  <p className="text-base text-black mb-6 line-clamp-4" dangerouslySetInnerHTML={{__html: p.content}}>
                  </p>
                  <Link to={`${p.slug}`} target={p.slug.startsWith('/') ? '_self' : '_blank'}>
                    <Button>
                      Saiba mais
                    </Button>
                  </Link>
                </div>
                <div>
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-full aspect-video rounded-[46px] object-cover"
                  />
                </div>
              </div>
            )
          )}
          
        </div>
      </section>

      {/* Contact Form */}
      <section className="pt-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ContactForm />
            <div className="w-full aspect-video md:aspect-auto md:mb-10">
              {mapLoaded && <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: '100%'
                }}
                center={{
                  lat: -20.471505663058004,
                  lng: -54.60738691570766,
                }}
                zoom={18}
                options={{mapTypeId: 'satellite'}}
                // onLoad={onLoad}
                // onUnmount={onUnmount}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <Marker position={{
                  lat: -20.471505663058004,
                  lng: -54.60738691570766,
                }} />
              </GoogleMap>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}