import { Link } from "react-router";
import { destinationButtons } from "../constants/homeComponents";

interface DestinationButtonsProps {
  isMobile?: boolean;
}

export default function DestinationButtons({ isMobile = false }: DestinationButtonsProps) {
  return (
    <div className={`flex gap-${isMobile ? '8' : '4'} ${isMobile ? 'justify-center absolute -top-[20px] z-10' : 'my-4 justify-center'}`}>
      {destinationButtons.map((button) => (
        <Link
          key={button.id}
          to={button.link}
          className="bg-black hover:bg-white hover:text-black transition-all rounded-[50px] px-6 py-2 text-base text-white"
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
}