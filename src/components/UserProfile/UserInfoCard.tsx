import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../services/api";
import { toast } from "react-toastify";
import { phoneMask } from "../../utils/phoneMask";

export default function UserInfoCard() {
  const { user } = useContext(AuthContext);
  const [settingsData, setSettingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    whatsapp: '',
    tiktok: '',
    phone_senzano: '',
    phone_locacao: '',
    phone_vendas: '',
    email_contato: '',
    bio: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data } = await api.get('/settings');
      setSettingsData(data.data);
      const settingsMap = {};
      data.data.forEach(setting => {
        settingsMap[setting.key] = setting.value;
      });
      setFormData({
        facebook: settingsMap.facebook || '',
        twitter: settingsMap.twitter || '',
        linkedin: settingsMap.linkedin || '',
        instagram: settingsMap.instagram || '',
        youtube: settingsMap.youtube || '',
        whatsapp: settingsMap.whatsapp || '',
        tiktok: settingsMap.tiktok || '',
        phone_senzano: settingsMap.phone_senzano || '',
        phone_locacao: settingsMap.phone_locacao || '',
        phone_vendas: settingsMap.phone_vendas || '',
        email_contato: settingsMap.email_contato || '',
        bio: settingsMap.bio || ''
      });
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const settingsToUpdate = [
        { key: 'facebook', value: formData.facebook, type: 'text' },
        { key: 'twitter', value: formData.twitter, type: 'text' },
        { key: 'linkedin', value: formData.linkedin, type: 'text' },
        { key: 'instagram', value: formData.instagram, type: 'text' },
        { key: 'youtube', value: formData.youtube, type: 'text' },
        { key: 'whatsapp', value: formData.whatsapp, type: 'text' },
        { key: 'tiktok', value: formData.tiktok, type: 'text' },
        { key: 'phone_senzano', value: formData.phone_senzano, type: 'text' },
        { key: 'phone_locacao', value: formData.phone_locacao, type: 'text' },
        { key: 'phone_vendas', value: formData.phone_vendas, type: 'text' },
        { key: 'email_contato', value: formData.email_contato, type: 'text' },
        { key: 'bio', value: formData.bio, type: 'text' }
      ];

      const promises = settingsToUpdate.map(setting => {
        const existingSetting = settingsData.find(s => s.key === setting.key);
        if (existingSetting) {
          return api.patch(`/settings/${existingSetting.id}`, { value: setting.value });
        } else {
          return api.post('/settings', setting);
        }
      });
      
      await Promise.all(promises);
      
      toast('Informações atualizadas!', { type: 'success' });
      loadSettings();
    } catch (err) {
      toast('Erro ao atualizar informações', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Informações Pessoais
        </h4>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Nome
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {user?.name || '-'}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {user?.email || '-'}
            </p>
          </div>
        </div>

      </div>

      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Redes Sociais
        </h4>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
          <div>
            <Label>Facebook</Label>
            <Input
              type="text"
              value={formData.facebook}
              onChange={(e) => setFormData({...formData, facebook: e.target.value})}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <Label>Twitter/X</Label>
            <Input 
              type="text" 
              value={formData.twitter}
              onChange={(e) => setFormData({...formData, twitter: e.target.value})}
              placeholder="https://x.com/..."
            />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
              placeholder="https://linkedin.com/..."
            />
          </div>
          <div>
            <Label>Instagram</Label>
            <Input 
              type="text" 
              value={formData.instagram}
              onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <Label>YouTube</Label>
            <Input 
              type="text" 
              value={formData.youtube}
              onChange={(e) => setFormData({...formData, youtube: e.target.value})}
              placeholder="https://youtube.com/..."
            />
          </div>
          <div>
            <Label>WhatsApp</Label>
            <Input 
              type="text" 
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: phoneMask(e.target.value)})}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label>TikTok</Label>
            <Input 
              type="text" 
              value={formData.tiktok}
              onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
              placeholder="https://tiktok.com/..."
            />
          </div>
        </div>
      </div>

      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Informações de Contato
        </h4>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
          <div>
            <Label>Telefone Senzano</Label>
            <Input 
              type="text" 
              value={formData.phone_senzano}
              onChange={(e) => setFormData({...formData, phone_senzano: phoneMask(e.target.value)})}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label>Telefone Locação</Label>
            <Input 
              type="text" 
              value={formData.phone_locacao}
              onChange={(e) => setFormData({...formData, phone_locacao: phoneMask(e.target.value)})}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label>Telefone Vendas</Label>
            <Input 
              type="text" 
              value={formData.phone_vendas}
              onChange={(e) => setFormData({...formData, phone_vendas: phoneMask(e.target.value)})}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label>Email para Contato</Label>
            <Input 
              type="email" 
              value={formData.email_contato}
              onChange={(e) => setFormData({...formData, email_contato: e.target.value})}
              placeholder="contato@senzano.com"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button size="sm" loading={loading} onClick={handleSave}>
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
