import FormCard from "../../../components/common/FormCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Switch from "../../../components/form/switch/Switch";

interface Props {
  hideUnchecked?: boolean;
  state: any;
  onChange: (e: any) => void;
  onSubmit?: (e: any) => void;
  onBack?: () => void;
  icon?: any;
  formCardTitle?: string;
  formCardDescription?: string;
  formCardButtonLabel?: string | null;
}

export default function Localizacao({ hideUnchecked, state, onChange, onSubmit,
  onBack,
  icon,
  formCardTitle,
  formCardDescription,
  formCardButtonLabel = null  }: Props) {

  return (
    <FormCard 
        stepText={formCardDescription} 
        onBack={onBack} 
        title={formCardTitle || "Localização"} 
        onSubmit={onSubmit}
        icon={icon}
        buttonLabel={formCardButtonLabel}>
      {/* Cerimônia */}
      <div>
        <Switch
          label="Cerimônia"
          color="pink"
          defaultChecked={state.enable_ceremony}
          onChange={(v) =>
            onChange({
              currentTarget: { name: "enable_ceremony", value: v },
            })
          }
        />
      </div>

      {(!hideUnchecked || state.enable_ceremony == true) && (<>
        <div className="flex gap-4 flex-col md:flex-row md:items-end">
          <div className="flex-1">
            <Label>Data do evento</Label>
            <Input
              type="date"
              name="ceremony_date"
              value={state.ceremony_date}
              required={state.enable_ceremony}
              onChange={onChange}
              disabled={!state.enable_ceremony}
              className={`p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400`}
              placeholder="Selecione a data"
            />
          </div>
          <div className="flex-1 flex gap-3">
              <div className="flex-1">
              <Label>Início</Label>
              <Input
                  type="time"
                  name="ceremony_time"
                  value={state.ceremony_time}
                  required={state.enable_ceremony}
                  onChange={onChange}
                  disabled={!state.enable_ceremony}
                  className={`p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400`}
              />
              </div>
              <div className="flex-1">
              <Label>Encerramento <span className="text-pink">(opcional)</span></Label>
              <Input
                  type="time"
                  name="ceremony_end_time"
                  value={state.ceremony_end_time}
                  onChange={onChange}
                  disabled={!state.enable_ceremony}
                  className={`p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400`}
              />
              </div>
          </div>
        </div>
  
        <Label>Nome do Local <span className="text-pink">(opcional)</span></Label>
        <Input
          type="text"
          name="ceremony_location"
          value={state.ceremony_location}
          onChange={onChange}
          disabled={!state.enable_ceremony}
          className={`p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400`}
          placeholder="Clube de eventos"
        />
  
        <Label>Rua, Número, Cidade, Estado <span className="text-pink">(opcional)</span></Label>
        <Input
          type="text"
          name="ceremony_address"
          value={state.ceremony_address}
          onChange={onChange}
          disabled={!state.enable_ceremony}
          className={`p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400`}
          placeholder="Rua Cardoso 123"
        />
      </>)}

      {/* Festa */}
      <div>
        <Switch
          label="Festa"
          color="pink"
          defaultChecked={state.enable_party}
          onChange={(v) =>
            onChange({
              currentTarget: { name: "enable_party", value: v },
            })
          }
        />
      </div>

      {(!hideUnchecked || state.enable_party == true) && (<>
        <div className="flex gap-4 flex-col md:flex-row md:items-end">
            <div className="flex-1">
            <Label>Data do evento</Label>
            <Input
                type="date"
                name="party_date"
                value={state.party_date}
                required={state.enable_party}
                onChange={onChange}
                disabled={!state.enable_party}
                className={`p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400`}
                placeholder="Selecione a data"
            />
            </div>
            <div className="flex-1 flex gap-3">
                <div className="flex-1">
                <Label>Início</Label>
                <Input
                    type="time"
                    name="party_time"
                    value={state.party_time}
                    required={state.enable_party}
                    onChange={onChange}
                    disabled={!state.enable_party}
                    className={`p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400`}
                />
                </div>
                <div className="flex-1">
                <Label>Encerramento <span className="text-pink">(opcional)</span></Label>
                <Input
                    type="time"
                    name="party_end_time"
                    value={state.party_end_time}
                    onChange={onChange}
                    disabled={!state.enable_party}
                    className={`p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400`}
                />
                </div>
            </div>
        </div>

        <Label>Nome do Local <span className="text-pink">(opcional)</span></Label>
        <Input
            type="text"
            name="party_location"
            value={state.party_location}
            onChange={onChange}
            disabled={!state.enable_party}
            className={`p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400`}
            placeholder="Clube de eventos"
        />

        <Label>Rua, Número, Cidade, Estado <span className="text-pink">(opcional)</span></Label>
        <Input
            type="text"
            name="party_address"
            value={state.party_address}
            onChange={onChange}
            disabled={!state.enable_party}
            className={`p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400`}
            placeholder="Rua Cardoso 123"
        />
      </>)}

    </FormCard>
  );
}
