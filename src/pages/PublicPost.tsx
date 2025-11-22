import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import api from "../services/api";
import axios from "axios";
import CONFIG from "../constants/config";
import PageMeta from "../components/common/PageMeta";

export default function PublicPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      const { data } = await axios.get(CONFIG.BASE_URL+`/public/post/${slug}`);
      setPost(data.data);
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
    <div className="w-full mx-auto">
      <PageMeta title={post.title} description={'Veja ' + post.title} image={post?.imageUrl || null} />

      <section className="relative w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200">
        <img
          src="/images/senzano-out.webp"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 flex items-center justify-center h-full pt-[60px] px-4">
          <h1 className="text-4xl md:text-6xl break-all text-center font-black text-primary tracking-tight">
            {post?.title}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mt-10 mb-10 px-4">
        {post?.imageUrl && (
          <img 
            src={`${post.imageUrl}`} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </div>
    </div>
  );
}