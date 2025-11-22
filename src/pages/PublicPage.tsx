import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import api from "../services/api";
import PageMeta from "../components/common/PageMeta";

export default function PublicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    try {
      const { data } = await api.get(`/public/page/${slug}`);
      setPage(data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-full h-64 rounded-lg mb-6"></div>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-3/4 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-5/6 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 rounded"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4/5 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageMeta title={page.title} description={'Veja ' + page.title} image={page?.imageUrl || null} />
      <div className="container mx-auto px-4 py-8 mt-16">

        <div className="max-w-4xl mx-auto">
          {page?.imageUrl && (
            <img 
              src={`${page.imageUrl}`} 
              alt={page.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            {page?.title}
          </h1>
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: page?.content }}
          />
        </div>
      </div>
    </>
  );
}