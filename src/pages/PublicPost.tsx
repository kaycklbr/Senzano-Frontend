import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router";
import api from "../services/api";

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
      const { data } = await api.get(`/post/${slug}`);
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
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  if (notFound) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {post?.image && (
          <img 
            src={`/storage/${post.image}`} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          {post?.title}
        </h1>
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </div>
    </div>
  );
}