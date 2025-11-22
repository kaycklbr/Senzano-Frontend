import { useEffect } from "react";
import { useLocation } from "react-router";

interface PageMetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const PageMeta = ({
  title,
  description = 'Senzano Empreendimentos - Seu ecossistema imobiliário',
  image,
}: PageMetaProps) => {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | Senzano Empreendimentos` : 'Senzano Empreendimentos';
    document.title = fullTitle;

    // Atualiza ou cria meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMeta("title", fullTitle);
    setMeta("description", description);

    const url = `${window.location.origin}${location.pathname}`;
    setOgMeta("og:url", url);
    setOgMeta("og:type", "website");
    setOgMeta("og:title", fullTitle);
    setOgMeta("og:description", description);

    if (image) {
      setOgMeta("og:image", image);
    }
  }, [title, description, image, location.pathname]);

  return null;
};


export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default PageMeta;
