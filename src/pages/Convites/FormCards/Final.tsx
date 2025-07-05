import { ConfirmModal } from "../../../components/common/ConfirmModal";
import FormCard from "../../../components/common/FormCard";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";

interface Props {
  hideDelete?: boolean;
  hideSlug?: boolean;
  state: any;
  setValue: (event: any) => void;
  onDelete?: () => void;
  onSubmit?: (e: any) => void;
  onBack?: () => void;
  icon?: any;
  formCardTitle?: string;
  formCardDescription?: string;
  formCardButtonLabel?: string | null;
}

export default function InfoFinal({
  hideDelete,
  hideSlug,
  state,
  setValue,
  onDelete,
  onSubmit,
  onBack,
  icon,
  formCardTitle,
  formCardDescription,
  formCardButtonLabel = null
}: Props) {
  return (
    <FormCard 
        stepText={formCardDescription} 
        onBack={onBack} 
        title={formCardTitle || "Detalhes finais"} 
        onSubmit={onSubmit}
        icon={icon}
        buttonLabel={formCardButtonLabel}
    >
      {!hideSlug && <div>
        <Label>URL do convite</Label>
        <div className="flex">
          <div
            className="text-gray-600 shadow-theme-xs text-xs flex items-center px-3 border rounded-l-md border-r-0 border-gray-300 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          >
            https://convitin.com.br/
          </div>
          <Input
            name="slug"
            value={state.slug}
            required
            className="rounded-l-none"
            onChange={setValue}
            placeholder="joao-e-maria"
          />
        </div>
      </div>}
      <div>
        <Label>
          Dress Code <span className="text-pink">(opcional)</span>
        </Label>
        <Input
          type="text"
          id="dressCode"
          name="dress_code"
          value={state.dress_code}
          onChange={setValue}
          placeholder="Terno, smoking, casual, ..."
        />
      </div>
      <div>
        <Label>
          Observações <span className="text-pink">(opcional)</span>
        </Label>
        <Input
          type="text"
          id="observations"
          value={state.observations}
          name="observations"
          onChange={setValue}
          placeholder="Vá de uber"
        />
      </div>
      <div>
        <Label>
          Música de fundo (YouTube) <span className="text-pink">(opcional)</span>
        </Label>
        <Input
          type="text"
          id="music"
          name="background_music"
          value={state.background_music}
          onChange={setValue}
          placeholder="https://www.youtube.com/watch?"
        />
      </div>
      <div>
        <Label>
          Iniciar música no segundo <span className="text-pink">(opcional)</span>
        </Label>
        <Input
          type="text"
          value={state.start_background_music}
          name="start_background_music"
          onChange={setValue}
          id="musicSegundo"
          placeholder="46"
        />
      </div>

      {(!hideDelete && onDelete) && <ConfirmModal
        onConfirm={onDelete}
        title="Excluir convite?"
        description="Você tem certeza que deseja excluir este convite? Essa ação é irreversível."
        trigger={
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Excluir convite
          </button>
        }
      />}
    </FormCard>
  );
}
