import PageMeta from "../../components/common/PageMeta";

import Input from "../../components/form/input/InputField";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "./FormCard";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/date-picker";
import { BoxCubeIcon, EnvelopeIcon, TimeIcon } from "../../icons";
import { UserIcon } from "../../icons";

import Switch from "../../components/form/switch/Switch";

import { Link, useNavigate, useParams } from "react-router";
import { FaAngleLeft, FaChevronRight, FaFloppyDisk, FaIcons, FaLink, FaLinkSlash, FaShapes, FaShare, FaX } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";
import api from "../../services/api";
import { login, setTokens } from "../../auth/auth";
import { toast } from "react-toastify";
import Button from "../ui/button/Button";
import { ConfirmModal } from "./ConfirmModal";
import { errorControl } from "../../services/utils";
import Spinner from "./Spinner";
import Presentes from "../../pages/Convites/FormCards/Presentes";
import Confirmacao from "../../pages/Convites/FormCards/Confirmacao";
import Informacoes from "../../pages/Convites/FormCards/Informacoes";
import Localizacao from "../../pages/Convites/FormCards/Localizacao";
import Galeria from "../../pages/Convites/FormCards/Galeria";
import InfoFinal from "../../pages/Convites/FormCards/Final";
import Modelos from "../../pages/Convites/FormCards/Modelos";
// import Input from "../../components/form/form-elements/DefaultInputs"
export default function ConviteDetails({ isEdit }) {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [instagramFields, setInstagramFields] = useState([""]);
  const [isCeremonyActive, setIsCeremonyActive] = useState(true);
  const [isPartyActive, setIsPartyActive] = useState(true);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [modelsLoading, setModelsLoading ] = useState(false);

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

  const [state, setState] = useState({
    title: '',
    event_date: '',
    description: '',
    enable_ceremony: true,
    enable_gift: false,
    hide_acompanhante: '',
    ceremony_date: '',
    ceremony_time: '',
    ceremony_end_time: '',
    ceremony_location: '',
    ceremony_address: '',
    enable_party: true,
    party_date: '',
    party_time: '',
    party_end_time: '',
    party_location: '',
    party_address: '',
    slug: '',
    dress_code: '',
    observations: '',
    owner_instagram: '',
    background_music: '',
    start_background_music: '',
    status: 'publish'
  });

  const params = useParams();
  const fetchConvite = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('convitin/v1/convites/' + params.id);
      setState(data);
      setMainImage(data.main_image);
      setImages(data.gallery);
      setInstagramFields(data.owner_instagram.split(','))
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {

    const fetchTemplate = async () => {
      setModelsLoading(true);
      const { data } = await api.get('convitin/v1/templates');
      setTemplates(data);
      setModelsLoading(false);
    }

    fetchTemplate();
    isEdit && fetchConvite();
  }, []);

  const setValue = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setState(prev => ({ ...prev, [name]: value }));
  }

  const removeItem = (indexToRemove) => {
    setImages(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const navigate = useNavigate();


  const handleSave = async () => {

    const forms = document.querySelectorAll('#edit-convite form');
    for (let f of forms) {
      if (!f.reportValidity()) {
        return;
      }
    }

    setSaveLoading(true);
    try {


      if (!state?.template_id) {
        toast('Selecione um modelo para salvar', { type: 'error' });
        setSaveLoading(false);
        return;
      }

      const data = { ...state };
      data.owner_instagram = instagramFields.join(',');


      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (mainImage?.id) {
        formData.set('main_image', mainImage?.id);
      } else {
        if (mainImage?.file) {
          formData.set('main_image', mainImage.file);
        } else {
          formData.delete('main_image')
        }
      }


      formData.delete('gallery');
      for (let img of images) {
        if (img?.id) {
          formData.append('existing_gallery[]', img.id);
        } else {
          formData.append('gallery[]', img.file);
        }
      }


      if (isEdit) {
        const response = await api.post('convitin/v1/convites/edit/' + params.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast('Convite atualizado com sucesso!', { type: 'success' });
      } else {
        const response = await api.post('convitin/v1/convites', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast('Convite criado com sucesso!', { type: 'success' });
        navigate('/admin/convites/' + response.data.id);

      }

      await fetchConvite();

    } catch (e) {
      toast(e.message, { type: 'error' });
    } finally {
      setSaveLoading(false);
    }

  }

  if (loading) {
    return <div role="status">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  }


  const handleDelete = async () => {
    try {
      await api.delete(`convitin/v1/convites/${params.id}`);
      toast.success(`Convite excluído com sucesso!`);
      navigate("/admin/convites");
    } catch (e) {
      toast.error(errorControl(e));
    }
  };

  return (
    <>
      <section id="edit-convite" className="relative h-full flex-1 md:h-auto flex flex-col items-center justify-center w-full">
        <div className="w-full h-full mt-3 bg-white 
        md:h-auto rounded-xl shadow-md
        p-4">
          <Modelos
            templates={templates}
            modelsLoading={modelsLoading}
            selectedTemplateId={state.template_id}
            onSelect={(id) => setState((prev) => ({ ...prev, template_id: id }))}
          />
        </div>

        <div className="w-full h-full mt-3 bg-white 
        md:h-auto rounded-xl shadow-md
        p-4">

          <Presentes
            enableGift={state.enable_gift}
            giftLink={state.gift_link}
            onChange={setValue}
            onSwitchChange={(v) =>
              setValue({
                currentTarget: { name: "enable_gift", value: v },
              })
            }
          />

          <hr className="my-3" />

          <Confirmacao
            allowGuests={state.hide_acompanhante !== 'hide-acompanhante'}
            onToggleAllowGuests={(v) =>
              setValue({
                currentTarget: {
                  name: "hide_acompanhante",
                  value: !v ? "hide-acompanhante" : "",
                },
              })
            }
          />

        </div>

        <div ref={parent} className="w-full h-full mt-3 bg-white 
        md:h-auto rounded-xl shadow-md
        p-4">
          <Informacoes
            title={state.title}
            description={state.description}
            eventDate={state.event_date}
            mainImage={mainImage}
            onChange={setValue}
            onImageDrop={handleMainDrop}
            onRemoveImage={() => setMainImage(null)}
          />

          <Localizacao state={state} onChange={setValue} />
          <Galeria images={images} onDrop={handleDrop} onRemove={removeItem} />

          <InfoFinal
            state={state}
            setValue={setValue}
            onDelete={handleDelete}
            saveLoading={saveLoading}
            onSave={handleSave}
          />


        </div >

        <div className="sticky p-3 flex right-0 bottom-2 w-full">
          <div className="flex-1 p-3 mx-2 bg-brand-50 shadow rounded-2xl">
            {(state.status == 'publish' && state?.url && !state.url.includes('page_id=')) && <div className="flex items-center justify-between bg-brand-200 rounded-2xl p-3 mb-3 text-sm text-brand-600">
              <a href={state.url} target={'_blank'} className="font-semibold underline">
                {state?.url}
              </a>
              <FaShare />
            </div>}
            <div className="flex justify-end items-center">
              {/* <Switch label={"Ativar convite"} color="pink" defaultChecked={state.status == 'publish'}
                onChange={(v) => setValue({ currentTarget: { name: 'status', value: !!v ? 'publish' : 'draft' } })} /> */}
              <Button className="px-10 w-full" loading={saveLoading} onClick={handleSave} >
                <FaFloppyDisk />
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
