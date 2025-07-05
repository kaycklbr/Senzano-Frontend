import FormCard from "../../../components/common/FormCard";
import Switch from "../../../components/form/switch/Switch";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";

interface Props {
  enableGift: boolean;
  giftLink?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

export default function Presentes({
  enableGift,
  giftLink,
  onChange,
  onSwitchChange,
}: Props) {
  return (
    <FormCard title="Lista de presentes" buttonLabel={null}>
      <Switch
        label="Ativar"
        color="pink"
        defaultChecked={enableGift}
        onChange={onSwitchChange}
      />

      <Label>Link da lista</Label>
      <Input
        type="text"
        name="gift_link"
        value={giftLink}
        onChange={onChange}
        placeholder="https://..."
      />
    </FormCard>
  );
}
