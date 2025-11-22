import PageMeta from "../../components/common/PageMeta";
import ContactForm from "../../components/ContactForm";

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-white">
      <PageMeta title="Contato" description="Entre em contato com a Senzano" image="/images/fundo.webp" />

      {/* Hero Section */}
      <section className="relative w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200">
        <img
          src="/images/senzano-out.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 flex items-center justify-center h-full pt-[60px] px-4">
          <h1 className="text-4xl md:text-6xl break-all text-center font-black text-primary tracking-tight">
            FALE CONOSCO
          </h1>
        </div>
      </section>
      {/* Terra dos Pequis */}
      <section className="py-16 max-w-4xl mx-auto">
        <ContactForm/>
      </section>

    </div>
  );
}
