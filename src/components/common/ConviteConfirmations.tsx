import PageMeta from "./PageMeta";

import Input from "../form/input/InputField";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "./FormCard";
import Label from "../form/Label";
import DatePicker from "../form/date-picker";
import { EnvelopeIcon } from "../../icons";
import { UserIcon } from "../../icons";

import Switch from "../form/switch/Switch";

import { Link, useParams } from "react-router";
import { FaAngleLeft } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

import { useDropzone } from "react-dropzone";
import api from "../../services/api";
import { login, setTokens } from "../../auth/auth";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
// import Input from "../../components/form/form-elements/DefaultInputs"
export default function ConviteConfirmations() {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [instagramFields, setInstagramFields] = useState([""]);
  const [isCeremonyActive, setIsCeremonyActive] = useState(true);
  const [isPartyActive, setIsPartyActive] = useState(true);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  function handleAddField() {
    setInstagramFields([...instagramFields, ""]);
  }

  function handleRemoveField() {
    setInstagramFields(instagramFields.slice(0, -1));
  }

  function handleChangeField(index: number, value: string) {
    const newFields = [...instagramFields];
    newFields[index] = value;
    setInstagramFields(newFields);
  }
  // const nextStep = () => setStep((prev) => prev + 1);
  const nextStep = (e: React.FormEvent) => {
    console.log("🟢 Botão clicado - tentando ir para o próximo passo...", state);
    window.scrollTo(0, 0)
    setStep((prev) => {
      console.log("🔄 Step anterior:", prev);
      const newStep = prev + 1;
      console.log("✅ Novo step:", newStep);
      return newStep;
    });
  };


  const [mainImage, setMainImage] = useState<any>();
  const handleMainDrop = (acceptedFiles: File[]) => {
    const newImage = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));


    setMainImage(newImage[0]);
  };

  const { getRootProps: getMainRootProps, getInputProps: getMainInputProps, isDragActive: isMainDragActive } = useDropzone({
    onDrop: handleMainDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
  });

  const handleDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
  });

  const toggleIsLogin = () => {
    setIsLogin((prev) => !prev);
  };
  function handleBackStep() {
    setStep(prev => prev - 1);
  }



  const [state, setState] = useState({
    title: '',
    event_date: '',
    description: '',
    enable_ceremony: true,
    ceremony_date: '',
    ceremony_time: '',
    ceremony_location: '',
    ceremony_address: '',
    enable_party: true,
    party_date: '',
    party_time: '',
    party_location: '',
    party_address: '',
    slug: '',
    dress_code: '',
    observations: '',
    owner_instagram: '',
    background_music: '',
    start_background_music: ''
  });

  const [confirmations, setConfirmations] = useState({});
  const [loading, setLoading] = useState(false);

  const params = useParams();
  useEffect(() => {
    const fetchConfirmations = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('convitin/v1/submissions/' + params.id);
        setConfirmations(data);
      } catch (e) {

      } finally {
        setLoading(false);
      }
    }

    fetchConfirmations();
  }, []);

  const setValue = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setState(prev => ({ ...prev, [name]: value }));
  }
  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm("Tem certeza que deseja deletar esta confirmação?");
    if (!confirmed) return;

    try {
      await api.delete(`convitin/v1/submissions/${id}`);
      toast.success("Confirmação deletada com sucesso!");

      // Atualiza a lista após deletar
      setConfirmations((prev) => ({
        ...prev,
        result: prev.result.filter((item) => item.id !== id),
      }));
    } catch (error) {
      toast.error("Erro ao deletar a confirmação.");
    }
  };


  const handleSave = async () => {

    const data = { ...state };
    data.owner_instagram = instagramFields.join(',');

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('main_image', mainImage.file);

    for (let img of images) {
      formData.append('gallery[]', img.file);
    }


    try {
      const loginData = await login(email, password);

      if (!loginData.success) {
        throw new Error(loginData.message);
      }

      toast('Login realizado com sucesso!', { type: 'success' });

      setTokens({ access_token: loginData.data.token })

      const response = await api.post('convitin/v1/convites', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data)

    } catch (e) {
      toast(e.message, { type: 'error' });
    }

  }

  if (loading || !confirmations?.result) {
    return <div role="status">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }

  return (
    <>
      <section className="h-full md:h-auto flex items-center justify-center w-full">
        <div ref={parent} className="w-full h-full bg-white 
          md:h-auto md:rounded-xl md:shadow-md
          p-4">
          <FormCard
            title="Confirmações de presença"
            buttonLabel={null}
          >
            <div className="flex gap-4 text-gray-500 text-sm my-4">
              <div className="flex flex-col items-center">
                <span>Confirmados</span>
                <span className="text-black text-5xl text-pink font-bold">{confirmations?.confirmed_count || 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Não confirmados</span>
                <span className="text-black text-5xl text-brand-500 font-bold">{confirmations?.not_confirmed_count || 0}</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Total de pessoas</span>
                <span className="text-black text-5xl text-pink font-bold">{confirmations?.total_people_confirmed || 0}</span>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Nome
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Acompanhante
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Confirmado
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Horário de Confirmação
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {confirmations?.result.map((c) => (
                    <TableRow key={'confirmation_' + c.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {c.fields.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {c.fields.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-800 font-medium text-start text-theme-sm dark:text-gray-400">
                        {c.fields.acompanhante || <span className="bg-pink-300 text-white p-1 rounded-2xl">Sem acompanhante</span>}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            c.fields.confirmed == 'Sim'
                              ? "success"
                              : "error"
                          }
                        >
                          {c.fields.confirmed}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {c.submitted_at}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <button className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1" onClick={() => handleDelete(item.id)}  >
                          <FaTrash />
                        </button>
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </div>
          </FormCard>

        </div>
      </section>
    </>
  );
}
