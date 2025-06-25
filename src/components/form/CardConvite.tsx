import Button from "../ui/button/Button";
import casamento from "../../../casamento-.png";
import { useNavigate } from "react-router";
import { FaArrowUpRightFromSquare, FaImage, FaLink, FaShare, FaShareNodes } from "react-icons/fa6";
import Switch from "./switch/Switch";
import { useState } from "react";
import { toast } from "react-toastify";
import { errorControl } from "../../services/utils";
import api from "../../services/api";

const CardConvite = ({ data }) => {
  const navigate = useNavigate();

  const [ status, setStatus ] = useState(data.status);

  function shareLink({ url = window.location.href, title = document.title, text = '' }) {
    if (navigator.share) {
        navigator.share({
            title,
            text,
            url
        }).then(() => {
            console.log('Link compartilhado com sucesso!');
        }).catch((error) => {
            console.warn('Erro ao compartilhar:', error);
        });
    } else {
        // Fallback: copiar para área de transferência
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado para a área de transferência!');
        }).catch(() => {
            // Fallback ainda mais simples
            prompt("Copie o link:", url);
        });
    }
}
  const onChangeStatus = async (v) => {
    try{
      const _status = !!v ? 'publish' : 'draft';
      await api.post('convitin/v1/update-status/'+data.id, {
        status: _status
      })
      setStatus(_status)
    }catch(e){
      toast(errorControl(e), { type: 'error'})
    }
  }

  return (
    <div className="grid grid-cols-3 bg-white rounded-2xl shadow-md overflow-hidden p-4 w-full max-w-3xl">
      {/* Imagem */}
      <div className="h-full">
        {data?.main_image ?
          <img
            src={data.main_image}
            alt="Imagem do convite"
            className="object-cover w-full h-full rounded-md"
          />
          :
          <div className="flex justify-center items-center w-full h-full bg-gray-100 rounded-md">
            <FaImage className="text-3xl text-gray-300"/>
          </div>
        }
      </div>

      {/* Título e conteúdo */}
      <div className="col-span-2 flex flex-col justify-between p-4">
        {/* Título e status */}
        <div className="flex flex-col gap-2">
          {data.status == 'publish' ?
          <a href={data.slug} target="_blank" className="flex items-center gap-2 underline">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <FaArrowUpRightFromSquare className="text-lg" />
          </a>
          :
          <h2 className="text-2xl font-bold">{data.title}</h2>
          }
          <div className="flex gap-2 items-center">
            <span className={"text-xs self-start text-center text-white rounded-md px-2 py-1 " + (status == 'publish' ? 'bg-pink-500' : 'bg-brand-500')}>
              {status == 'publish' ? 'Ativo' : 'Rascunho'}
            </span>
            <Switch color="pink" defaultChecked={status == 'publish'}
                  onChange={(v) => onChangeStatus(v)}  />
          </div>
        </div>

        {/* Confirmações e Recebidos */}
        <div className="flex justify-between text-gray-500 text-sm my-4">
          <div className="flex flex-col items-center">
            <span>Confirmações</span>
            <span className="text-black text-xl font-bold">{data?.totals?.confirmed_count || 0}</span>
          </div>
          {/* <div className="flex flex-col items-center">
            <span>Recebidos</span>
            <span className="text-black text-xl font-bold">{data?.gifts || 0}</span>
          </div> */}
        </div>

        {/* Botão Editar */}
        <div className="flex gap-2">
          <Button className="flex-1 text-white font-bold py-2 rounded-xl" onClick={() => navigate('/admin/convites/' + data.id)}>
            Editar / Confirmações
          </Button>
          <Button className="bg-pink hover:bg-pink-600 text-white font-bold py-2 rounded-xl w-[60px]" onClick={() => shareLink({url: data.slug, title: 'Você foi convidado!'})}>
            <FaShareNodes />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardConvite;
