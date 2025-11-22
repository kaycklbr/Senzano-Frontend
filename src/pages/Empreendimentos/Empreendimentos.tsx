import {
  Menu,
  MapPin,
  Package,
  DollarSign,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";
import CONFIG from "../../constants/config";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function Empreendimentos() {

  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const { data } = await axios.get(CONFIG.BASE_URL+'/public/posts?type=empreendimento');
        setPosts(data?.data);
      }catch(e){

      }finally{
        setLoading(false);
      }
    }
    fetchData()
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <PageMeta title="Empreendimentos" description="Encontre empreendimentos" image="/images/fundo.webp" />
      {/* Hero Section */}
      <section className="relative w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200">
        <img
          src="/images/senzano-out.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 flex items-center justify-center h-full pt-[60px] px-4">
          <h1 className="text-4xl md:text-6xl break-all text-center font-black text-primary tracking-tight">
            EMPREENDIMENTOS
          </h1>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl mb-16">
            <span className="font-normal">Diferenciais dos nossos </span>
            <span className="font-bold">empreendimentos</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Entrega Segura */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="/images/icons/key.svg"
                  alt="Entrega Segura"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-base">
                <span className="font-black font-poppins">ENTREGA </span>
                <span className="font-poppins">SEGURA</span>
              </p>
            </div>

            {/* Financiamento Próprio */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="/images/icons/dollar.svg"
                  alt="Financiamento Próprio"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-base">
                <span className="font-black font-poppins">FINANCIAMENTO</span>
                <br />
                <span className="font-light font-poppins">PRÓPRIO</span>
              </p>
            </div>

            {/* Padrão de Qualidade */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="/images/icons/diamond.svg"
                  alt="Padrão de qualidade senzano"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-base">
                <span className="font-black font-poppins">PADRÃO DE</span>
                <br />
                <span className="font-black font-poppins">QUALIDADE</span>
                <span className="font-light font-poppins"> SENZANO</span>
              </p>
            </div>

            {/* Empreendimentos Planejados */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="/images/icons/light.svg"
                  alt="Empreendimentos planejados"
                  className="w-12 h-12 object-contain mb-4"
                />
              </div>
              <p className="text-base">
                <span className="font-black font-poppins">EMPREENDIMENTOS</span>
                <br />
                <span className="font-light font-poppins">PLANEJADOS</span>
              </p>
            </div>

            {/* Potencial de Valorização */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src="/images/icons/house-stat.svg"
                  alt="Potencial de valorização imobiliária"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-base">
                <span className="font-light font-poppins">POTENCIAL DE</span>
                <br />
                <span className="font-black font-poppins">VALORIZAÇÃO</span>
                <br />
                <span className="font-black font-poppins">IMOBILIÁRIA</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {!!posts?.length && posts.map((p, i) => 
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={"bg-gray-300 rounded-[15px] h-[344px] w-full overflow-hidden "}>
                <img src={p.imageUrl} className="h-full w-full object-cover" />
              </div>
              <div className={i%2 != 0 ? 'order-2' : ''}>
                <h3 className="font-poppins uppercase text-[28px] font-black text-[#6b1417] leading-[31px] mb-4">
                  {p.title}
                </h3>
                <p className="font-poppins text-base text-black text-justify leading-7 mb-6">
                  <div dangerouslySetInnerHTML={{__html:p.content}}/>
                </p>
                <Link to={p.slug}  target={p.slug.startsWith('/') ? '_self' : '_blank'}>
                  <Button>
                    Saiba mais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      )}

      {/* Maria Neves */}
      {/* <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-poppins text-[28px] font-black text-[#6b1417] leading-[31px] mb-4 text-right">
                MARIA NEVES
              </h3>
              <p className="font-poppins text-base text-black text-justify leading-7 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <div className="flex justify-end">
                <Button>
                  Saiba mais
                </Button>
              </div>
            </div>

            <div className="bg-gray-300 rounded-[15px] h-[344px] w-full order-1 lg:order-2"></div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
