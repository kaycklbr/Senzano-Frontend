import { useState, useEffect } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Button from "../components/ui/button/Button";
import Spinner from "../components/ui/Spinner";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Empreendimentos() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      const empreendimentos = data.data.filter(post => post.type === 'empreendimento');
      setPosts(empreendimentos);
    } catch (err) {
      toast('Erro ao carregar empreendimentos', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este empreendimento?')) return;
    
    try {
      await api.delete(`/posts/${id}`);
      toast('Empreendimento excluído!', { type: 'success' });
      loadPosts();
    } catch (err) {
      toast('Erro ao excluir empreendimento', { type: 'error' });
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Empreendimentos" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/admin/empreendimentos/novo">
            <Button size="sm">Novo Empreendimento</Button>
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Título</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Slug</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post: any) => (
                  <tr key={post.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-gray-800 dark:text-white/90">{post.title}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{post.slug}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {post.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link to={`/admin/empreendimentos/editar/${post.id}`}>
                          <Button size="sm" variant="outline">Editar</Button>
                        </Link>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum empreendimento encontrado
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}