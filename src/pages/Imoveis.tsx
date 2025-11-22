import { useState, useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import Button from "../components/ui/button/Button";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import Spinner from "../components/ui/Spinner";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Imoveis() {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState({ total: 0, imobzi: 0, imoview: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    crm_origin: '',
    featured: false,
    search: ''
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async (page = 1) => {
    try {
      const params = new URLSearchParams();
      if (filters.crm_origin) params.append('crm_origin', filters.crm_origin);
      if (filters.featured) params.append('destaque', '1');
      if (filters.search) params.append('search', filters.search);
      params.append('page', page.toString());

      const { data } = await api.get(`/properties?${params.toString()}`);
      setProperties(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page
      });
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      toast('Erro ao carregar imóveis', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    setLoading(true);
    loadProperties();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getPropertyCode = (property) => {
    return property.crm_origin === 'imobzi' ? property.crm_code : property.external_id;
  };

  const getFirstImage = (property) => {
    if (property.cover_photo) {
      return property.cover_photo.split(',')[0];
    }
    return null;
  };

  const toggleFeatured = (propertyId, currentStatus) => {
    // Atualiza estado imediatamente
    setProperties(properties.map(p => 
      p.id === propertyId ? {...p, destaque: !currentStatus} : p
    ));
    
    // Dispara update async
    api.patch(`/properties/${propertyId}/toggle-featured`)
      .then(() => {
        toast('Status de destaque atualizado!', { type: 'success' });
      })
      .catch(() => {
        // Reverte estado em caso de erro
        setProperties(properties.map(p => 
          p.id === propertyId ? {...p, destaque: currentStatus} : p
        ));
        toast('Erro ao atualizar destaque', { type: 'error' });
      });
  };

  const getPropertyUrl = (property) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/imovel/${property.slug}`;
  };


  return (
    <>
      <PageBreadcrumb pageTitle="Imóveis" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Imóveis
          </h3>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total de Imóveis</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Imobzi</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.imobzi}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Imoview</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.imoview}</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Filtros */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div>
              <Label>CRM Origin</Label>
              <select
                value={filters.crm_origin}
                onChange={(e) => setFilters({...filters, crm_origin: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Todos</option>
                <option value="imobzi">Imobzi</option>
                <option value="imoview">Imoview</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={filters.featured}
                onChange={(e) => setFilters({...filters, featured: e.target.checked})}
                className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500"
              />
              <Label htmlFor="featured">Em Destaque</Label>
            </div>

            <div>
              <Label>Pesquisar</Label>
              <Input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Código, ID ou título"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={handleFilter} size="sm">
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Imagem</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Título</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">CRM</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Código</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Preço</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Destaque</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property: any) => (
                    <tr key={property.id} className="border-b text-sm border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4">
                        {getFirstImage(property) ? (
                          <img 
                            src={getFirstImage(property)} 
                            alt={property.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">Sem foto</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-white/90">
                        {property.title}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          property.crm_origin === 'imobzi' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {property.crm_origin}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {getPropertyCode(property)}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-white/90 font-medium">
                        {formatPrice(property.rental_value > 0 ? property.rental_value : property.sale_value)}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleFeatured(property.id, property.destaque)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            property.destaque ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              property.destaque ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => window.open(getPropertyUrl(property), '_blank')}
                          className="p-2 text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                          title="Ver imóvel"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {properties.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhum imóvel encontrado
                </div>
              )}
            </div>
            
            {/* Paginação */}
            {pagination && pagination.last_page > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                  Mostrando {((pagination.current_page - 1) * pagination.per_page) + 1} a {Math.min(pagination.current_page * pagination.per_page, pagination.total)} de {pagination.total} resultados
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={pagination.current_page === 1}
                    onClick={() => loadProperties(pagination.current_page - 1)}
                  >
                    Anterior
                  </Button>
                  <span className="px-3 py-1 text-sm">
                    Página {pagination.current_page} de {pagination.last_page}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => loadProperties(pagination.current_page + 1)}
                  >
                    Próxima
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}