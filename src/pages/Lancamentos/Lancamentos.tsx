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

export default function Lancamentos() {
  return (
    <div className="w-full min-h-screen bg-white">

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
      {/* Terra dos Pequis */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-300 rounded-[15px] h-[344px] w-full"></div>

            <div>
              <h3 className="font-poppins text-[28px] font-black text-primary leading-[31px] mb-4">
                TERRA DOS PEQUIS
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
              <Button>
                Saiba mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Maria Neves */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-poppins text-[28px] font-black text-primary leading-[31px] mb-4 text-right">
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
      </section>
    </div>
  );
}
