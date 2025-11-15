import {
  Menu,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  AlertCircle,
  Loader2,
  Bed,
  Bath,
  Fullscreen,
  Car,
} from "lucide-react";
import { useParams, Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import PropertyCard from "../../components/PropertyCard";
import { GoogleMap, Marker } from '@react-google-maps/api'
import CONFIG from "../../constants/config";
import { getYouTubeVideoId } from "../../services/utils";

interface PropertyDetail {
  id: number;
  crm_origin: string;
  external_id: string;
  title: string;
  description: string;
  sale_value: string;
  rental_value: string;
  property_type: string;
  finality: string;
  status: string;
  address: string;
  address_complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  area_total: string;
  area_useful: string;
  bedroom: number;
  bathroom: number;
  suite: number;
  garage: number;
  cover_photo: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  similar?: PropertyDetail[];
}

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMedia, setShowMedia] = useState('fotos');
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalAnimating, setModalAnimating] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    cellphone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const swiperRef = useRef(null);
  const backgroundSwiperRef = useRef(null);

    const [ location, setLocation ] = useState({
    lat:-7.007260,
    lng: -40.936018,
    zoom: 16
  })

  useEffect(() => {
    if (id) {
      fetchPropertyDetails(id);
    }
  }, [id]);

  const fetchPropertyDetails = async (propertyId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${CONFIG.BASE_URL}/properties/${propertyId}`);
      const propertyData = response.data;
      setProperty(propertyData);
      
      // Split cover_photo by comma to get multiple images
      if (propertyData.cover_photo) {
        const imageUrls = propertyData.cover_photo ? propertyData.cover_photo.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0) : [];
        const videoUrls = propertyData.videos ? propertyData.videos.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0) : [];
        setImages(imageUrls.length > 0 ? imageUrls : []);
        setVideos(videoUrls.length > 0 ? videoUrls : []);
      } 
    } catch (error) {
      console.error('Erro ao buscar detalhes do imóvel:', error);
      setError('Erro ao carregar detalhes do imóvel');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Imóvel não encontrado</h2>
          <p className="text-gray-600 mb-6">{error || 'O imóvel solicitado não foi encontrado.'}</p>
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-[#8b1a1f] transition-colors">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const isVenda = property.crm_origin === 'imobzi';
  const price = parseFloat(property?.sale_value) || parseFloat(property?.rental_value);
  const condominioPrice = parseFloat(property?.condominio || 0);
  const iptuPrice = parseFloat(property?.iptu || 0);
  const formattedPrice = (price + iptuPrice + condominioPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleShare = async () => {
    const url = window.location.href;
    const title = property.title;
    const text = `Confira este imóvel: ${title}`;

    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
      } catch (error) {
        console.log('Erro ao copiar link:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cellphone') {
      const masked = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
      setFormData({ ...formData, [name]: masked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${CONFIG.BASE_URL}/properties/note`, {
        ...formData,
        property_id: property.id
      });
      alert('Mensagem enviada com sucesso!');
      setShowMessageModal(false);
      setFormData({ firstname: '', lastname: '', email: '', cellphone: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="w-full min-h-screen bg-white">


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 bg-primary rounded-2xl overflow-hidden w-full h-[70%]">
              <Swiper
                  ref={backgroundSwiperRef}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  className="w-full h-full"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img 
                        src={image} 
                        alt={`${property.title} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover blur-xs brightness-50"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
            <div className="relative bg-gray-300 rounded-[15px] aspect-video mb-4 overflow-hidden max-w-3xl z-1 shadow-lg">
              {showMedia == 'maps' ? (
                <div className="w-3xl max-w-full h-full flex items-center justify-center bg-gray-200">
                   <GoogleMap
                    mapContainerStyle={{
                      width: '100%',
                      height: '100%'
                    }}
                    center={{
                      lat: +property?.latitude,
                      lng: +property?.longitude,
                    }}
                    zoom={14}
                    // onLoad={onLoad}
                    // onUnmount={onUnmount}
                  >
                    {/* Child components, such as markers, info windows, etc. */}
                    <Marker position={{
                      lat: +property?.latitude,
                      lng: +property?.longitude,
                    }} />
                  </GoogleMap>
                  {/* <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Mapa do imóvel</p>
                    <p className="text-sm text-gray-500">{property.address}, {property.neighborhood}</p>
                    <p className="text-sm text-gray-500">{property.city} - {property.state}</p>
                  </div> */}
                </div>
              ) : (
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                  }}
                  onSlideChange={(swiper) => {
                    if (backgroundSwiperRef.current && backgroundSwiperRef.current.swiper) {
                      backgroundSwiperRef.current.swiper.slideTo(swiper.realIndex);
                    }
                  }}
                  className="w-full h-full"
                >
                  {(showMedia == 'fotos' ? images : videos).map((media, index) => (
                    <SwiperSlide key={index}>
                      {showMedia == 'fotos' ? <img 
                        src={media} 
                        alt={`${property.title} - Media ${index + 1}`}
                        className="w-full h-full object-cover"
                       /> :
                       <iframe className="w-full h-full" src={"https://www.youtube.com/embed/"+getYouTubeVideoId(media)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              
              {/* Custom Navigation Buttons */}
              {showMedia != 'maps' && images.length > 1 && (
                <>
                  <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white z-10 transition-all">
                    <ChevronLeft className="w-6 h-6 text-black" />
                  </button>
                  <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white z-10 transition-all">
                    <ChevronRight className="w-6 h-6 text-black" />
                  </button>
                </>
              )}

              {/* Custom Pagination */}
              {!showMedia && images.length > 1 && (
                <div className="swiper-pagination-custom absolute bottom-20 left-1/2 -translate-x-1/2 z-10"></div>
              )}

              {/* Tabs */}
              <div className="absolute bottom-4 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <button 
                  onClick={() => setShowMedia('fotos')}
                  className={`rounded-[50px] px-6 py-2 text-base transition-colors ${
                    showMedia == 'fotos' ? 'bg-white text-black' : 'bg-primary text-white'
                  }`}
                >
                  FOTOS
                </button>
                {property?.videos && <button 
                  onClick={() => setShowMedia('videos')}
                  className={`rounded-[50px] px-6 py-2 text-base transition-colors ${
                    showMedia == 'videos' ? 'bg-white text-black' : 'bg-primary text-white'
                  }`}
                >
                  VÍDEOS
                </button>}
                {property?.latitude && <button 
                  onClick={() => setShowMedia('maps')}
                  className={`rounded-[50px] px-6 py-2 text-base transition-colors ${
                    showMedia == 'maps' ? 'bg-white text-black' : 'bg-primary text-white'
                  }`}
                >
                  MAPA
                </button>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-start w-full max-w-4xl mx-auto gap-8">
            <div className="mt-8 flex-1 self-end">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-black text-black uppercase">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <p className="text-base text-black">
                      {property.address}, {property.neighborhood} - {property.city} - {property.state}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">CÓD: {property?.crm_code || property.external_id}</p>
                </div>
              </div>

              {/* Property Features */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="border border-black rounded-[15px] px-4 py-1 flex items-center gap-2">
                  <Fullscreen className="w-5 h-5 text-gray-600" />
                  <span className="text-lg font-semibold text-black">
                    {parseFloat(property.area_total)}m²
                  </span>
                </div>
                {property.suite > 0 && (
                  <div className="border border-black rounded-[15px] px-4 py-1 flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold text-black">
                      {property.suite} Suíte{property.suite > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {property.bedroom > 0 && (
                  <div className="border border-black rounded-[15px] px-4 py-1 flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold text-black">
                      {property.bedroom} Quarto{property.bedroom > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {property.bathroom > 0 && (
                  <div className="border border-black rounded-[15px] px-4 py-1 flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold text-black">
                      {property.bathroom} Banheiro{property.bathroom > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {property.garage > 0 && (
                  <div className="border border-black rounded-[15px] px-4 py-1 flex items-center gap-2">
                    <Car className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-semibold text-black">
                      {property.garage} Vaga{property.garage > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                <div className="border border-black rounded-[15px] px-4 py-1">
                  <span className="text-lg font-semibold text-black">
                    {property.property_type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-sm text-black leading-7">
                  <div dangerouslySetInnerHTML={{ __html: property.description || 'Descrição não disponível para este imóvel.'}}/>
                </p>
              </div>
              
            </div>

            <div className="bg-[#eaeaea] rounded-4xl p-8 md:-mt-20 z-1">
               <div className="flex flex-wrap justify-end">
                <span className="flex-1 text-primary font-semibold">TOTAL</span>
                <p className="text-3xl md:text-4xl font-extrabold text-primary tracking-tighter">
                  {formattedPrice}<span className="text-sm font-semibold">{(!isVenda && !!property.rental_value) ? '/mês' : ''}</span>
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg text-black">
                    {isVenda ? 'Venda' : 'Locação'}
                  </span>
                  <span className="text-xl font-semibold text-primary">
                    {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                {!isVenda && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lg text-black">
                        Condomínio
                      </span>
                      <span className="text-xl font-medium text-primary">
                        {condominioPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lg text-black">IPTU</span>
                      <span className="text-xl font-medium text-primary">
                        {iptuPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t border-black/20 pt-4 mb-6">
                <div className="flex items-center gap-2 text-[#686868] text-[9px]">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  <span>Valores sujeitos a alteração sem aviso prévio.</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleShare}
                  className="w-full border border-black rounded-[15px] py-2 flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-base font-semibold ">
                    Compartilhar imóvel
                  </span>
                </button>

                <button 
                  onClick={() => {
                    setShowMessageModal(true);
                    setTimeout(() => setModalAnimating(true), 10);
                  }}
                  className="w-full border border-black rounded-[15px] py-2 hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="text-base font-semibold ">
                    Deixe sua mensagem
                  </span>
                </button>

                <a href="/" target="_blank" className="w-full bg-gradient-to-r from-red-600 to-primary rounded-[15px] py-2 flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                  <img
                    src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1760969039529-node-15%3A304-1760969039106.png"
                    alt="WhatsApp"
                    className="w-5 h-5"
                  />
                  <span className="text-base font-semibold text-white">
                    Chame no Whatsapp
                  </span>
                </a>
              </div>
            </div>
          </div>  
      </div>

      {/* Similar Properties */}
      <section className="py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Você também pode gostar
          </h2>
          
          <div className="flex items-center justify-center relative">
            <div className="hidden md:block bg-primary h-[70%] w-full absolute"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {property.similar?.slice(0, 3).map((similar) => (
                <PropertyCard
                  key={similar.id}
                  id={similar.id}
                  slug={similar.slug}
                  title={similar.title}
                  address={similar.address}
                  neighborhood={similar.neighborhood}
                  cover_photo={similar.cover_photo}
                />
              )) || (
                <div className="col-span-3 text-center text-gray-500">
                  <p>Nenhum imóvel similar encontrado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Message Modal */}
      {showMessageModal && (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out ${
          modalAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 ease-out ${
            modalAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <h3 className="text-xl font-bold mb-4">Deixe sua mensagem</h3>
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <input
                type="text"
                name="firstname"
                placeholder="Primeiro Nome"
                value={formData.firstname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-3 py-2"
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Segundo Nome"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-3 py-2"
                required
              />
              <input
                type="tel"
                name="cellphone"
                placeholder="(00) 00000-0000"
                value={formData.cellphone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-3 py-2"
                required
              />
              <textarea
                name="message"
                placeholder="Mensagem"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-2xl px-3 py-2 h-24 resize-none"
                rows={3}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setModalAnimating(false);
                    setTimeout(() => setShowMessageModal(false), 300);
                  }}
                  className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-primary text-white rounded-2xl px-4 py-2 hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
