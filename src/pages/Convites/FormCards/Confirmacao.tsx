import FormCard from "../../../components/common/FormCard";
import Switch from "../../../components/form/switch/Switch";

interface Props {
  allowGuests: boolean;
  onToggleAllowGuests: (checked: boolean) => void;
}

export default function Confirmacao({
  allowGuests,
  onToggleAllowGuests,
}: Props) {
  return (
    <FormCard title="Lista de confirmação" buttonLabel={null}>
      <Switch
        label="Permitir acompanhantes"
        color="pink"
        defaultChecked={allowGuests}
        onChange={onToggleAllowGuests}
      />
    </FormCard>
  );
}
