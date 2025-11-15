import { Link } from "react-router";
import { SSenzano } from "../icons";

interface ServiceItemProps {
  item: {
    id: string;
    icon: React.ComponentType<{ className?: string }> | null;
    label: any;
    link: string;
    hasSpecialIcon?: boolean;
    external?: boolean;
  };
  isMobile?: boolean;
}

export default function ServiceItem({ item, isMobile = false }: ServiceItemProps) {
  const IconComponent = item.icon;
  const content = (
    <div className="cursor-pointer hover:scale-110 transition-all hover:text-primary flex flex-col gap-2 pb-8 pt-2 items-center">
      {IconComponent && <IconComponent className={`${isMobile ? 'text-6xl' : 'text-4xl md:text-6xl'}`} />}
      <span className={`${isMobile ? 'text-sm' : 'text-base'} text-center font-semibold ${item.hasSpecialIcon ? 'flex' : ''}`}>
        {item.hasSpecialIcon ? (
          <span>
            <span className="font-icomoon text-sm">S</span>Ó LANÇAMENTOS
          </span>
        ) : (
          item.label
        )}
      </span>
    </div>
  );

  return item.external ? (
    <Link to={item.link} target="_blank">
      {content}
    </Link>
  ) : (
    <Link to={item.link}>
      {content}
    </Link>
  );
}