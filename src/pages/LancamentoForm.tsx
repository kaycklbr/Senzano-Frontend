import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Button from "../components/ui/button/Button";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import api from "../services/api";
import { toast } from "react-toastify";
import TinyMCEEditor from "../components/form/SlateEditor";

export default function LancamentoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    seo_title: '',
    seo_description: '',
    slug: '',
    active: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEdit) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setFormData({
        title: data.data.title || '',
        content: data.data.content || '',
        seo_title: data.data.seo_title || '',
        seo_description: data.data.seo_description || '',
        slug: data.data.slug || '',
        active: data.data.active ?? true
      });
      if (data.data.image) {
        setImagePreview(data.data.imageUrl);
      }
    } catch (err) {
      toast('Erro ao carregar lançamento', { type: 'error' });
      navigate('/admin/lancamentos');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (typeof value === 'boolean') {
          formDataToSend.append(key, value ? '1' : '0');
        } else {
          formDataToSend.append(key, value);
        }
      });
      formDataToSend.append('type', 'lancamento');
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (isEdit) {
        await api.put(`/posts/${id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast('Lançamento atualizado!', { type: 'success' });
      } else {
        await api.post('/posts', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast('Lançamento criado!', { type: 'success' });
      }
      
      navigate('/admin/lancamentos');
    } catch (err) {
      toast('Erro ao salvar lançamento', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBreadcrumb 
        pageTitle={isEdit ? "Editar Lançamento" : "Novo Lançamento"} 
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Label>Título *</Label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Título do lançamento"
                required
              />
            </div>
            
            <div>
              <Label>Slug</Label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                placeholder="slug-do-lancamento"
              />
            </div>
          </div>

          <div>
            <Label>Imagem Principal</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs h-32 object-cover rounded" />
            )}
          </div>

          <div>
            <Label>Conteúdo *</Label>
            <TinyMCEEditor
              value={formData.content}
              onChange={(content) => setFormData({...formData, content})}
              placeholder="Descrição do lançamento"
              height={300}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Label>SEO Título</Label>
              <Input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                placeholder="Título para SEO"
              />
            </div>
            
            <div>
              <Label>SEO Descrição</Label>
              <Input
                type="text"
                value={formData.seo_description}
                onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
                placeholder="Descrição para SEO"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
              className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500"
            />
            <Label htmlFor="active">Ativo</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/lancamentos')}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              {isEdit ? 'Atualizar' : 'Criar'} Lançamento
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}