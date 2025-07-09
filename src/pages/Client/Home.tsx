import PageMeta from "../../components/common/PageMeta";

import Input from "../../components/form/input/InputField";
import { useContext, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "../../components/common/FormCard";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/date-picker";
import { EnvelopeIcon } from "../../icons";
import { UserIcon } from "../../icons";
import Lottie from "lottie-react";
import CreatingAnimation from '../../icons/creating.json';
import Switch from "../../components/form/switch/Switch";

import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { FaAngleLeft } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";
import api from "../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { register } from "../../auth/auth";
import { errorControl, slugify } from "../../services/utils";
import Modelos from "../Convites/FormCards/Modelos";
import Informacoes from "../Convites/FormCards/Informacoes";
import Localizacao from "../Convites/FormCards/Localizacao";
import Galeria from "../Convites/FormCards/Galeria";
import InfoFinal from "../Convites/FormCards/Final";
// import Input from "../../components/form/form-elements/DefaultInputs"
export default function Home() {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [instagramFields, setInstagramFields] = useState([""]);
  const [isCeremonyActive, setIsCeremonyActive] = useState(true);
  const [isPartyActive, setIsPartyActive] = useState(true);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState();
  const [templates, setTemplates] = useState([]);
  const [ modelsLoading, setModelsLoading ] = useState(false);


  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval); // limpa quando componente desmonta
  }, []);


  // const nextStep = () => setStep((prev) => prev + 1);
  const nextStep = (e: React.FormEvent) => {
    window.scrollTo(0, 0)
    setStep((prev) => {
      const newStep = prev + 1;
      return newStep;
    });
  };
 

  const [ mainImage, setMainImage ] = useState<any>();
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

  const removeItem = (indexToRemove) => {
    setImages(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };
  
  const toggleIsLogin = () => {
    setIsLogin((prev) => !prev);
  };
  function handleBackStep() {
    setStep(prev => prev - 1);
  }

  useEffect(() => {

    const fetchTemplate = async () => {
      setModelsLoading(true);
      const { data } = await api.get('convitin/v1/templates');
      setTemplates(data);
      setState(prev => ({...prev, template_id: searchParams.get('template') || data[0]?.id || ''}))
      setModelsLoading(false)
    }

    fetchTemplate();
  }, []);

  
  const searchParams: any = new URLSearchParams(useLocation().search);

  const [ loading, setLoading ] = useState<boolean>(false);

  const [ authSuccess, setAuthSuccess ] = useState(false);

  const [ state, setState ] = useState({
    title: '',
    event_date: '',
    description: '',
    enable_ceremony: false,
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
    start_background_music: 0
  });

  const setValue = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setState(prev => ({...prev, [name]: value}));
  }

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleFinish = async () => {

    setLoading(true);

    try{

      const data = {...state};
      data.owner_instagram = instagramFields.join(',');

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if(mainImage?.file){
        formData.append('main_image', mainImage.file);
      }
      
      for(let img of images){
        formData.append('gallery[]', img.file);
      }

      if(!isLogin){
        await register(name, email, password);
      }

      const loginData = await login(email, password);

      setAuthSuccess(true);
      toast('Criando convite! Aguarde...', { type: 'success' });

      const response = await api.post('convitin/v1/convites', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/admin/convites');

    }catch(e){
      console.log(e)
      toast(errorControl(e) || 'Erro ao criar convite, tente novamente.', { type: 'error' });
      setAuthSuccess(false);
    }finally{
      setLoading(false);
    }

  }

  const setEventDate = (e) => {
    setState(prev => ({...prev,
      event_date: e.target.value,
      ceremony_date: e.target.value,
      party_date: e.target.value,
    }))
  }

  const setEventName = (e) => {
    setState(prev => ({...prev,
      title: e.target.value,
      slug: slugify(e.target.value),
    }))
  }

  return (
    <>
      <PageMeta title={"Convitin"} description="Crie seu convite" />
      <section className="h-full md:h-auto flex items-center justify-center">
          <div ref={parent} className="w-full h-full bg-white 
          md:h-auto md:max-w-2xl md:rounded-xl md:shadow-md
          p-4">
          {step === 0 && (
            <>
              <Modelos
                templates={templates}
                modelsLoading={modelsLoading}
                selectedTemplateId={state.template_id}
                onSelect={(id) => setState((prev) => ({ ...prev, template_id: id }))}
              />
              <Informacoes
                title={state.title}
                description={state.description}
                eventDate={state.event_date}
                mainImage={mainImage}
                gettingStarted
                onChange={setValue}
                onImageDrop={handleMainDrop}
                onRemoveImage={() => setMainImage(null)}
                setTitle={setEventName}
                setEventDate={setEventDate}
                onSubmit={nextStep}
                onBack={handleBackStep}
                formCardTitle='Crie seu convite'
                formCardDescription='Passo 1'
                formCardButtonLabel='Próximo Passo'
              />
            </>
          )}

          {step === 1 && (
            <Localizacao 
              state={state} 
              onChange={setValue} 
              formCardDescription='Passo 2'
              formCardButtonLabel='Próximo Passo'
              icon={<FaAngleLeft className=" text-blue-dark" />}
              onSubmit={nextStep}
              onBack={handleBackStep}
              hideUnchecked
              />
          )}

        
      
          {step === 2 && (
            <Galeria 
              images={images} 
              onDrop={handleDrop} 
              onRemove={removeItem} 
              formCardDescription='Passo 3'
              formCardButtonLabel={images.length === 0 ? "Pular etapa" : "Próximo passo"}
              icon={<FaAngleLeft className=" text-blue-dark" />}
              onSubmit={nextStep}
              onBack={handleBackStep}
              />
          )}


          {step === 3 && (
            <InfoFinal
              state={state}
              setValue={setValue}
              formCardDescription='Passo 4'
              formCardButtonLabel={'Próximo passo'}
              icon={<FaAngleLeft className=" text-blue-dark" />}
              onSubmit={nextStep}
              onBack={handleBackStep}
              gettingStarted
              hideDelete
              hideSlug
            />
          )}

          {step === 4 && (
            
            <FormCard
              stepText="Passo Final"
              title={isLogin ? "Login" : "Cadastro"}
              buttonLabel={isLogin ? "Entrar" : "Criar Conta"}
              buttonLoading={loading}
              icon={<FaAngleLeft className="text-blue-dark" />}
              onSubmit={handleFinish}
              onBack={handleBackStep}
              footer={
                <div className="flex justify-center gap-2 text-sm">
                  <p className="text-black">
                    {isLogin ? "Não possui uma conta?" : "Já possui uma conta?"}
                  </p>
                  <button
                    onClick={toggleIsLogin}
                    type="button"
                    className="text-pink font-semibold"
                  >
                    {isLogin ? "Cadastre-se" : "Entrar"}
                  </button>
                </div>
              }
            >
              {/* Se for cadastro, mostra campo Nome */}
              {!isLogin && (
                <div>
                  <Label>Nome</Label>
                  <div className="relative">
                    <Input id="username" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Nome de usuário" type="text" />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 px-3.5 py-3">
                      <UserIcon className="size-6" />
                    </span>
                  </div>
                </div>
              )}

              {/* Email (sempre mostra) */}
              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Input id="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="info@gmail.com" type="email" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 px-3.5 py-3">
                    <EnvelopeIcon className="size-6" />
                  </span>
                </div>
              </div>

              {/* Senha (sempre mostra) */}
              <div>
                <Label>Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 px-3.5 py-3"
                  >
                    {/* Colocar o ícone do olho aqui */}
                  </button>
                </div>
              </div>

              {/* Se for cadastro, mostra Confirmar Senha */}
              {false && (
                <div>
                  <Label>Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-3.5 py-3"
                    >
                      {/* ícone de olho aqui também */}
                    </button>
                  </div>
                </div>
              )}
            </FormCard>

        )}
        {authSuccess && <div className="bg-white fixed top-0 left-0 w-full h-full flex flex-col items-center py-10">
          <Lottie animationData={CreatingAnimation} className="md:w-100" loop/>
          <h1 className="font-bold text-2xl text-center">Estamos criando seu convite,<br/>aguarde{dots}</h1>
        </div>}
        </div>
      </section>

    </>
  );
}
