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
import axios from "axios";
import CONFIG from "../../constants/config";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";

export default function Lancamentos() {

  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const { data } = await axios.get(CONFIG.BASE_URL+'/public/posts?type=lancamento');
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
      <PageMeta title="Lançamentos" description="Encontre lançamentos" image="/images/fundo.webp" />


      {/* Hero Section */}
      <section className="relative w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200">
        <img
          src="/images/senzano-out.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 flex items-center justify-center h-full pt-[60px] px-4">
          <h1 className="text-4xl md:text-6xl break-all text-center font-black text-primary tracking-tight">
            <span className="font-icomoon">S</span>Ó LANÇAMENTOS
          </h1>
        </div>
      </section>
      {!!posts?.length && posts.map((p, i) => 
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-300 rounded-[15px] h-[344px] w-full overflow-hidden">
                <img src={p.imageUrl} className="h-full w-full object-cover" />
              </div>
              <div className={i%2 != 0 ? 'order-2' : ''}>
                <h3 className="font-poppins uppercase text-[28px] font-black text-[#6b1417] leading-[31px] mb-4">
                  {p.title}
                </h3>
                <p className="font-poppins text-base line-clamp-4 text-black text-justify leading-7 mb-6">
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
    </div>
  );
}
