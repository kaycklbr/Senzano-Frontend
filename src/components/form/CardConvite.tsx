import Button from "../ui/button/Button";
import casamento from "../../../casamento-.png";
import { useNavigate } from "react-router";

const CardConvite = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 bg-white rounded-2xl shadow-md overflow-hidden p-4 w-full max-w-3xl">
      {/* Imagem */}
      <div className="h-full">
        <img
          src={data.main_image}
          alt="Imagem do convite"
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      {/* Título e conteúdo */}
      <div className="col-span-2 flex flex-col justify-between p-4">
        {/* Título e status */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <span className={"text-xs self-start text-center text-white rounded-md px-2 py-1 " + (data.status == 'publish' ? 'bg-pink-500' : 'bg-brand-500')}>
            {data.status == 'publish' ? 'Ativo' : 'Rascunho'}
          </span>
        </div>

        {/* Confirmações e Recebidos */}
        <div className="flex justify-between text-gray-500 text-sm my-4">
          <div className="flex flex-col items-center">
            <span>Confirmações</span>
            <span className="text-black text-xl font-bold">{data?.confirmations || 0}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Recebidos</span>
            <span className="text-black text-xl font-bold">{data?.gifts || 0}</span>
          </div>
        </div>

        {/* Botão Editar */}
        <Button className="text-white font-bold py-2 rounded-xl" onClick={() => navigate('/admin/convites/' + data.id)}>
          Editar
        </Button>
      </div>
    </div>
  );
};

export default CardConvite;
