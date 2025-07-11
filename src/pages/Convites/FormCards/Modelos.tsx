import { FaChevronRight } from "react-icons/fa6";
import FormCard from "../../../components/common/FormCard";
import Spinner from "../../../components/common/Spinner";
import { useRef, useState } from "react";
import { useSwipeable } from 'react-swipeable';

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

  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef<any>(null);
  const isSwiping = useRef<any>(null);

  const scrollRight = () => {
    const scrollAmount = 150; // Ajuste conforme necessário
    if (listRef.current) {
      listRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      setScrollPosition((prev) => prev + scrollAmount);
    }
  };

  const startScrollLeft = useRef(0);

  const swipeHandlers = useSwipeable({
    onSwipeStart: (e) => {
    isSwiping.current = false;
      e.event.preventDefault();               // evita drag & drop e seleção
      startScrollLeft.current = listRef.current?.scrollLeft ?? 0;
    },
    onSwiping: ({ deltaX }) => {
      if (Math.abs(deltaX) > 5) isSwiping.current = true;
      if (listRef.current) {
        listRef.current.scrollLeft = startScrollLeft.current - deltaX;
      }
    },
    onSwiped: () => {
      setTimeout(() => (isSwiping.current = false), 50); // limpa flag depois de um curto tempo
    },
    preventScrollOnSwipe: true, 
    trackMouse: true,   // habilita drag com mouse no desktop
    trackTouch: false,   // padrão: já vem true, mas declaramos para clareza
  });

  return (
    <FormCard title="Modelos" buttonLabel={null}>
      <div className="relative">
        <div {...swipeHandlers} ref={listRef}  className="flex gap-3 overflow-x-auto relative pr-[50px]">
          {modelsLoading && <Spinner />}
          {templates.map((t, index) => {
            const isSelected = selectedTemplateId == t.id;
            return (
              <div
                key={"template_" + index}
                onClick={() => !isSwiping.current && onSelect(t.id)}
                role="button"
                tabIndex={0}
                className={
                  "flex flex-col select-none items-center min-w-[130px] max-w-[130px] min-h-[180px] cursor-pointer border rounded-md p-2 transition-all " +
                  (isSelected
                    ? "border-brand-500 bg-pink-50"
                    : "border-gray-300 hover:bg-gray-50")
                }
              >
                <img
                  src={t.main_image}
                  alt={t.title}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
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
          onClick={scrollRight}
          className="cursor-pointer absolute right-[-1px] text-pink top-0 h-full w-[60px] flex items-center justify-end pr-1"
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
