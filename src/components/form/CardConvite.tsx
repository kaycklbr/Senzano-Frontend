import Button from "../ui/button/Button";
import casamento from "../../../casamento-.png";
import { Link, useNavigate } from "react-router";
import { FaArrowUpRightFromSquare, FaCheck, FaCopy, FaImage, FaLink, FaShare, FaShareNodes } from "react-icons/fa6";
import Switch from "./switch/Switch";
import { useState } from "react";
import { toast } from "react-toastify";
import { errorControl } from "../../services/utils";
import api from "../../services/api";
import useClipboard from "../../hooks/useClipboard";

const CardConvite = ({ data }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(data.status);

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
      const fullText = `${text}\n\n${url}`;
      navigator.clipboard.writeText(fullText).then(() => {
        alert('Texto copiado para a área de transferência!');
      }).catch(() => {
        // Fallback ainda mais simples
        prompt("Copie o link:", fullText);
      });
    }
  }
  const onChangeStatus = async (v) => {
    try {
      const _status = !!v ? 'publish' : 'draft';
      await api.post('convitin/v1/update-status/' + data.id, {
        status: _status
      })
      setStatus(_status)
    } catch (e) {
      toast(errorControl(e), { type: 'error' })
    }
  }

  const { isCopied, copy } = useClipboard();

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
            <FaImage className="text-3xl text-gray-300" />
          </div>
        }
      </div>

      {/* Título e conteúdo */}
      <div className="col-span-2 flex flex-col justify-between p-4">
        {/* Título e status */}
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{data.title}</h2>
          <div className="flex gap-2 items-center">
            {/* <Switch color="pink" defaultChecked={status == 'publish'}
              onChange={(v) => onChangeStatus(v)} /> */}
          </div>
        </div>


        {/* Botão Editar */}
        <div className="flex gap-2 mt-2">
          <a href={data.slug} target="_blank" className="flex-1">
            <Button size="sm" className="flex-1 text-white w-full font-bold text-xs rounded-xl">
            Ver convite <FaArrowUpRightFromSquare/>
            </Button>
          </a>
          <Button size="sm" className="bg-pink hover:bg-pink-600 text-white font-bold rounded-xl w-[60px]" onClick={() => copy(data.slug)}>
            {isCopied ? <FaCheck/> : <FaCopy />}
          </Button>
        </div>
        
        <Link to={'/admin/convites/'+ data.id + '?tab=confirmation'} className="w-full mt-2">
            <Button className="flex-1 text-white w-full font-bold py-2 rounded-xl bg-pink hover:bg-pink-600 " >
          Confirmações ({data?.totals?.confirmed_count || 0})
            </Button>
          </Link>
        <div className="flex gap-2 mt-2">
          <Link to={'/admin/convites/'+ data.id} className="flex-1">
            <Button className="flex-1 text-white w-full font-bold py-2 rounded-xl" >
              Editar
            </Button>
          </Link>
          <Button className="bg-pink hover:bg-pink-600 text-white font-bold py-2 rounded-xl w-[60px]" onClick={() => shareLink({ url: data.slug, title: 'Você foi convidado!', text: `O evento mais importante do ano está chegando e é com muito prazer que eu te convido para esse dia tão especial\n\nClique aqui para acessar o convite e confirme sua presença. 👇 ` })}>
            <FaShareNodes />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardConvite;
