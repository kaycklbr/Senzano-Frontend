import { Link } from "react-router";

interface PropertyCardProps {
  id: number;
  slug: string;
  title: string;
  address: string;
  neighborhood: string;
  cover_photo: string;
}

export default function PropertyCard({ id, slug, title, address, neighborhood, cover_photo }: PropertyCardProps) {
  const firstImage = cover_photo?.split(',')[0]?.trim() || "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1760896857756-node-9%3A212-1760896856550.png";

  return (
    <Link to={`/imovel/${slug}`} className="block">
      <div className="relative bg-gray-300 rounded-[15px] h-[309px] overflow-hidden group hover:shadow-lg transition-all">
        <img 
          src={firstImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_33KiCJsOhVXgExoJMUwtDekAVXW-1760896857756-node-9%3A212-1760896856550.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/100 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
          <p className="text-sm opacity-90">{address}, {neighborhood}</p>
        </div>
      </div>
    </Link>
  );
}