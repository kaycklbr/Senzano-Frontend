import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import CONFIG from "../../constants/config";

const AnuncieForm = () => {
  const [step, setStep] = useState(1);
  const [parent, enableAnimations] = useAutoAnimate()

  const [dadosProprietario, setDadosProprietario] = useState({
    firstname: "",
    lastname: "",
    email: "",
    cellphone: "",
  });

  const [dadosImovel, setDadosImovel] = useState({
    tipo: "",
    area: "",
    endereco: "",
    tipoNegocio: "",
    quartos: "",
    banheiros: "",
    preco: "",
    descricao: "",
  });

  const handleChangeProprietario = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'cellphone') {
      const masked = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
      setDadosProprietario({ ...dadosProprietario, [name]: masked });
    }else{
      setDadosProprietario({ ...dadosProprietario, [name]: value });
    }
  };

  const handleChangeImovel = (e) => {
    setDadosImovel({ ...dadosImovel, [e.target.name]: e.target.value });
  };

  const handleSubmitProprietario = (e) => {
    e.preventDefault();
    if (dadosProprietario.firstname && dadosProprietario.lastname && dadosProprietario.email && dadosProprietario.cellphone) {
      setStep(2);
    }
  };

  const handleSubmitImovel = async (e) => {
    e.preventDefault();
    if (dadosImovel.tipo && dadosImovel.area && dadosImovel.endereco && dadosImovel.tipoNegocio && 
        dadosImovel.quartos && dadosImovel.banheiros && dadosImovel.preco && dadosImovel.descricao) {
      
      const firstname = dadosProprietario.firstname;
      const lastname = dadosProprietario.lastname;
      
      const message = `DADOS DO IMÓVEL:\n\n
        Tipo: ${dadosImovel.tipo}\n
        Área: ${dadosImovel.area}m²\n
        Endereço: ${dadosImovel.endereco}\n
        Tipo de Negócio: ${dadosImovel.tipoNegocio}\n
        Quartos: ${dadosImovel.quartos}\n
        Banheiros: ${dadosImovel.banheiros}\n
        Preço Desejado: ${dadosImovel.preco}\n
        Descrição: ${dadosImovel.descricao}`;
      
      const dados = {
        firstname,
        lastname,
        email: dadosProprietario.email,
        cellphone: dadosProprietario.cellphone,
        message,
        type: dadosImovel.tipoNegocio
      };
      
      try {
        await axios.post(`${CONFIG.BASE_URL}/properties/note`, {
          ...dados
        });
        setStep(3);
      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    }
  };

  const resetForm = () => {
    setStep(1);
    setDadosProprietario({ firstname: "", lastname: "", email: "", cellphone: "" });
    setDadosImovel({
      tipo: "",
      area: "",
      endereco: "",
      tipoNegocio: "",
      quartos: "",
      banheiros: "",
      preco: "",
      descricao: "",
    });
  };

  return (
    <div ref={parent} className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      {/* --- Step 1: Dados do Proprietário --- */}
      {step === 1 && (
        <>
          <div className="from-primary-light to-primary bg-gradient-to-r text-white text-center py-4">
            <h2 className="text-xl font-bold">Dados do Proprietário</h2>
            <p className="text-sm">
              Primeiro, precisamos de suas informações de contato
            </p>
          </div>

          <form onSubmit={handleSubmitProprietario} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="firstname"
                  value={dadosProprietario.firstname}
                  onChange={handleChangeProprietario}
                  placeholder="Seu nome"
                  className="w-full border rounded-2xl px-3 text-sm py-3 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sobrenome</label>
                <input
                  type="text"
                  name="lastname"
                  value={dadosProprietario.lastname}
                  onChange={handleChangeProprietario}
                  placeholder="Seu sobrenome"
                  className="w-full border rounded-2xl px-3 text-sm py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                value={dadosProprietario.email}
                onChange={handleChangeProprietario}
                placeholder="seu@email.com"
                className="w-full border rounded-2xl text-sm px-3 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="tel"
                name="cellphone"
                value={dadosProprietario.cellphone}
                onChange={handleChangeProprietario}
                placeholder="(61) 99999-9999"
                className="w-full border rounded-2xl text-sm px-3 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!dadosProprietario.firstname || !dadosProprietario.lastname || !dadosProprietario.email || !dadosProprietario.cellphone}
              className="w-full from-primary-light to-primary bg-gradient-to-r text-white py-3 rounded-2xl text-sm hover:bg-primary-light transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </form>
        </>
      )}

      {/* --- Step 2: Dados do Imóvel --- */}
      {step === 2 && (
        <>
          <div className="from-primary-light to-primary bg-gradient-to-r text-white text-center py-4">
            <h2 className="text-xl font-bold">Dados do Imóvel</h2>
            <p className="text-sm">Agora, conte-nos sobre seu imóvel</p>
          </div>

          <form onSubmit={handleSubmitImovel} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo do Imóvel</label>
                <input
                  type="text"
                  name="tipo"
                  value={dadosImovel.tipo}
                  onChange={handleChangeImovel}
                  placeholder="Casa, Apartamento, etc."
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Área (m²)</label>
                <input
                  type="number"
                  name="area"
                  value={dadosImovel.area}
                  onChange={handleChangeImovel}
                  placeholder="120"
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={dadosImovel.endereco}
                  onChange={handleChangeImovel}
                  placeholder="Rua, número, bairro, cidade"
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de Negócio</label>
                <select
                  name="tipoNegocio"
                  value={dadosImovel.tipoNegocio}
                  onChange={handleChangeImovel}
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="venda">Venda</option>
                  <option value="locacao">Locação</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quartos</label>
                <input
                  type="number"
                  name="quartos"
                  value={dadosImovel.quartos}
                  onChange={handleChangeImovel}
                  placeholder="3"
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Banheiros</label>
                <input
                  type="number"
                  name="banheiros"
                  value={dadosImovel.banheiros}
                  onChange={handleChangeImovel}
                  placeholder="2"
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preço Desejado</label>
                <input
                  type="text"
                  name="preco"
                  value={dadosImovel.preco}
                  onChange={handleChangeImovel}
                  placeholder="R$ 500.000"
                  className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={dadosImovel.descricao}
                onChange={handleChangeImovel}
                placeholder="Descreva as principais características do seu imóvel..."
                rows={3}
                className="w-full border text-sm rounded-2xl px-3 py-3 outline-none"
              ></textarea>
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={!dadosImovel.tipo || !dadosImovel.area || !dadosImovel.endereco || !dadosImovel.tipoNegocio || !dadosImovel.quartos || !dadosImovel.banheiros || !dadosImovel.preco || !dadosImovel.descricao}
                className="w-1/2 from-primary-light to-primary bg-gradient-to-r text-white py-3 rounded-2xl hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
        </>
      )}

      {/* --- Step 3: Confirmação --- */}
      {step === 3 && (
        <div className="p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-500 w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Solicitação Enviada!</h2>
          <p className="text-gray-600 mb-6">
            Recebemos suas informações e entraremos em contato em até 24 horas
            para agendar uma avaliação gratuita.
          </p>
          <button
            onClick={resetForm}
            className="from-primary-light to-primary bg-gradient-to-r text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition-colors font-semibold"
          >
            Anunciar Outro Imóvel
          </button>
        </div>
      )}

      {/* --- Step indicator (footer) --- */}
      <div className="flex justify-center items-center gap-2 pb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-1 h-1 rounded-full ${
              step === s ? "bg-primary" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnuncieForm;
