import { FaChevronRight } from "react-icons/fa6";
import FormCard from "../../../components/common/FormCard";
import Spinner from "../../../components/common/Spinner";

interface Template {
  id: number;
  title: string;
  main_image: string;
}

interface Props {
  templates: Template[];
  modelsLoading: boolean;
  selectedTemplateId?: number;
  onSelect: (templateId: number) => void;
}

export default function Modelos({
  templates,
  modelsLoading,
  selectedTemplateId,
  onSelect,
}: Props) {
  return (
    <FormCard title="Modelos" buttonLabel={null}>
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto relative pr-[50px]">
          {modelsLoading && <Spinner />}
          {templates.map((t, index) => {
            const isSelected = selectedTemplateId == t.id;
            return (
              <div
                key={"template_" + index}
                onClick={() => onSelect(t.id)}
                role="button"
                tabIndex={0}
                className={
                  "flex flex-col items-center min-w-[130px] max-w-[130px] min-h-[180px] cursor-pointer border rounded-md p-2 transition-all " +
                  (isSelected
                    ? "border-brand-500 bg-pink-50"
                    : "border-gray-300 hover:bg-gray-50")
                }
              >
                <img
                  src={t.main_image}
                  alt={t.title}
                  className="object-cover w-[130px] h-[180px] rounded-md border-1 border-gray-300"
                />
                <h5 className="text-sm text-black font-bold text-center">
                  {t.title}
                </h5>
                <div
                  className={
                    "py-1 px-2 text-white text-xs rounded-2xl transition-colors " +
                    (isSelected
                      ? "bg-brand-500"
                      : "bg-pink-300 hover:bg-pink-400")
                  }
                >
                  {isSelected ? "Selecionado" : "Selecionar"}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="absolute right-0 text-pink top-0 h-full w-[60px] flex items-center justify-end pr-1"
          style={{
            background: "linear-gradient(90deg, #ffffff00, #ffffff, #ffffff)",
          }}
        >
          <FaChevronRight />
        </div>
      </div>
    </FormCard>
  );
}
