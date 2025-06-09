import PageMeta from "../../components/common/PageMeta";

import Input from "../../components/form/input/InputField";
import { useContext, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "../../components/common/FormCard";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/date-picker";
import { EnvelopeIcon } from "../../icons";
import { UserIcon } from "../../icons";

import Switch from "../../components/form/switch/Switch";

import { Link, useNavigate, useSearchParams } from "react-router";
import { FaAngleLeft } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";
import api from "../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { register } from "../../auth/auth";
import { errorControl } from "../../services/utils";
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
  
  const searchParams: any = useSearchParams();

  const [ loading, setLoading ] = useState<boolean>(false);

  const [ state, setState ] = useState({
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
    start_background_music: 0,
    template_id: searchParams?.template || null
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

    const data = {...state};
    data.owner_instagram = instagramFields.join(',');

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('main_image', mainImage.file);
    
    for(let img of images){
      formData.append('gallery[]', img.file);
    }


    try{

      if(!isLogin){
        await register(name, email, password);
      }

      const loginData = await login(email, password);

      toast('Criando convite! Aguarde...', { type: 'success' });

      const response = await api.post('convitin/v1/convites', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/admin/convites');

    }catch(e){
      toast(errorControl(e) || 'Erro ao criar convite, tente novamente.', { type: 'error' });
    }finally{
      setLoading(false);
    }

  }

  return (
    <>
      <PageMeta title={"Convitin"} description="Crie seu convite" />
      <section className="h-full md:h-auto flex items-center justify-center">
          <div ref={parent} className="w-full h-full bg-white 
          md:h-auto md:max-w-md md:rounded-xl md:shadow-md
          p-4">
          {step === 0 && (
            <>
              <FormCard
                title="Crie seu convite"
                stepText="Passo 1"
                buttonLabel="Próximo Passo"
                // icon={<SlArrowRight size={20} color="blue" />}
                onSubmit={nextStep}
              >
                <div>
                  <Label>Nome do evento</Label>
                  <Input
                    type="text"
                    name="title"
                    required
                    value={state.title}
                    onChange={setValue}
                    placeholder="João e Maria, M & H, ..."
                  />
                </div>

                <div>
                  <Label>Foto principal</Label>

                  <div
                    {...getMainRootProps()}
                    className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
                      ${
                        isMainDragActive
                          ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                          : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                      }
                    `}
                    id="demo-upload"
                  >
                    {/* Hidden Input */}
                    <input {...getMainInputProps()} required />

                    <div className="dz-message flex flex-col items-center m-0!">
                      {/* Icon Container */}
                      <div className="mb-[22px] flex justify-center">
                        <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                          <svg
                            className="fill-current"
                            width="29"
                            height="28"
                            viewBox="0 0 29 28"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                            />
                          </svg>
                        </div>
                      </div>

                      <span className="font-medium underline text-theme-sm text-pink">
                      Escolha sua foto
                      </span>
                      
                    </div>
                  </div>
                </div>

                {mainImage && (
                  <div className="mt-4">
                    <img
                      src={mainImage.url}
                      alt="Preview"
                      className="max-w-full h-auto rounded-xl border"
                    />
                  </div>
                )}

                {/* <div > */}
                <Label htmlFor="tm">Data do evento</Label>
                  <Input
                    type="date"
                    name="event_date"
                    required
                    value={state.event_date}
                    onChange={setValue}
                    placeholder="Selecione a data"
                  />
                {/* </div> */}

                <div>
                  <Label htmlFor="eventPhrase">Frase inicial</Label>
                  <Input
                    type="text"
                    required
                    name="description"
                    value={state.description}
                    onChange={setValue}
                    placeholder="Venha celebrar conosco nessa festa..."
                  />
                </div>
              </FormCard>
            </>
          )}

          {step === 1 && (
            <FormCard
              title="Localização"
              stepText="Passo 2"
              buttonLabel="Próximo Passo"
              icon={<FaAngleLeft className=" text-blue-dark" />}
              onSubmit={nextStep}
              onBack={handleBackStep}
            >
              <div>
                <Switch label={"Cerimônia"} color="pink" defaultChecked={state.enable_ceremony}
                  onChange={(v) => setValue({currentTarget: {name: 'enable_ceremony', value: v}})}  />
              </div>
              <div className="flex gap-4 ">
                <div>
                  <Label htmlFor="tm">Data do evento</Label>
                  <Input
                    type="date"
                    name="ceremony_date"
                    required={state.enable_ceremony}
                    value={state.ceremony_date}
                    onChange={setValue}
                    disabled={!state.enable_ceremony}
                    placeholder="Selecione a data"
                    />
                </div>
                <div>
                  <Label htmlFor="tm">Hora do evento</Label>
                  <Input type="time" id="tm" 
                    name="ceremony_time" 
                    required={state.enable_ceremony}
                    onChange={setValue} 
                    value={state.ceremony_time}
                    disabled={!state.enable_ceremony} className='p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400' />
                </div>
              </div>
              <Label htmlFor="address">Local </Label>
              <Input type="text" id="address" required={state.enable_ceremony} value={state.ceremony_location} name="ceremony_location" onChange={setValue} disabled={!state.enable_ceremony} className='p-2 border rounded-md ${state.enable_ceremony ? "bg-white" : "bg-gray-100"} text-gray-400' placeholder="Clube de eventos" />
              <Label htmlFor="fulladdress">Endereço</Label>
              <Input
                type="text"
                name="ceremony_address"
                required={state.enable_ceremony}
                value={state.ceremony_address}
                onChange={setValue} 
                disabled={!state.enable_ceremony}
            className={`p-2 border rounded-md ${
              state.enable_ceremony ? "bg-white" : "bg-gray-100 text-gray-400"
            }`}
                placeholder="Rua Cardoso 123"
              />

              <div>
                <Switch label={"Festa"} color="pink" defaultChecked={state.enable_party}
                  onChange={(v) => setValue({currentTarget: {name: 'enable_party', value: v}})}  />
              </div>
              <div className="flex gap-4 ">
                <div>
                  <Label htmlFor="tm">Data do evento</Label>
                  <Input
                    type="date"
                    name="party_date"
                    value={state.party_date}
                    required={state.enable_party}
                    onChange={setValue}
                    placeholder="Selecione a data"
                    disabled={!state.enable_party}
                    />
                </div>
                <div>
                  <Label htmlFor="tm">Hora do evento</Label>
                  <Input type="time" id="tm" required={state.enable_party} name="party_time" value={state.party_time} onChange={setValue} disabled={!state.enable_party} className='p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400' />
                </div>
              </div>
              <Label htmlFor="address">Local </Label>
              <Input type="text" id="address" required={state.enable_party} name="party_location" value={state.party_location} onChange={setValue} disabled={!state.enable_party} className='p-2 border rounded-md ${state.enable_party ? "bg-white" : "bg-gray-100"} text-gray-400' placeholder="Clube de eventos" />
              <Label htmlFor="fulladdress">Endereço</Label>
              <Input
                type="text"
                id="fullAddress"
                required={state.enable_party}
                name="party_address" value={state.party_address}
                onChange={setValue}
                disabled={!state.enable_party}
            className={`p-2 border rounded-md ${
              state.enable_party ? "bg-white" : "bg-gray-100 text-gray-400"
            }`}
                placeholder="Rua Cardoso 123"
              />

            </FormCard>
          )}

        
      
          {step === 2 && (
            <FormCard
              stepText="Passo 3"
              title="Galeria de fotos"
              buttonLabel={images.length === 0 ? "Pular etapa" : "Próximo passo"}
              icon={<FaAngleLeft className="text-blue-dark" />}
              onSubmit={nextStep}
              onBack={handleBackStep}
            >
    
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-4">
            {/* Botão de adicionar foto */}
            <div
              {...getRootProps()}
              className={`dropzone rounded-xl flex flex-col items-center justify-center border-2 border-dashed ${
                isDragActive
                  ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                  : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
              } w-full aspect-square p-2 transition`}
              id="demo-upload"
            >
              <input {...getInputProps()} />
              <div className="dz-message flex flex-col items-center m-0">
                <div className="mb-1 flex justify-center">
                  <div className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3c-.22 0-.42.09-.58.24L7.76 6.9c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0L11 5.78V16c0 .41.34.75.75.75s.75-.34.75-.75V5.78l2.18 2.18c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06L12.58 3.24C12.42 3.09 12.22 3 12 3zM5 16c0-.41-.34-.75-.75-.75S3.5 15.59 3.5 16v3c0 1.24 1.01 2.25 2.25 2.25h12.5c1.24 0 2.25-1.01 2.25-2.25v-3c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3c0 .41-.34.75-.75.75H6.25c-.41 0-.75-.34-.75-.75v-3z"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-xs font-medium text-pink text-center">
                  Adicionar foto
                </span>
              </div>
            </div>

            {/* Imagens adicionadas */}
            {images.map((imgObj, index) => (
              <div key={index} className="w-full aspect-square  rounded-md overflow-hidden border-2 border-gray-300">
                <img
                  src={imgObj.url}
                  alt={`Foto ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
            </FormCard>
          )}


          {step === 3 && (
            <FormCard
              stepText="passo 4"
              title="Detalhes finais"
              buttonLabel="Proximo passo"
              icon={<FaAngleLeft className=" text-blue-dark" />}
              onSubmit={nextStep}
              onBack={handleBackStep}
            >
              <div>
                <Label>URL do convite</Label>
                <div className="flex">
                  <div
                    className="text-gray-600 shadow-theme-xs text-xs flex items-center px-3 border rounded-l-md border-r-0 border-gray-300  bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                  >
                    https://convitin.com.br/
                  </div>
                  <Input
                    name="slug"
                    value={state.slug}
                    className="rounded-l-none"
                    required
                    onChange={setValue}
                    placeholder="joao-e-maria"
                  />
                </div>
              </div>
              <div>
                <Label>Dress Code <small className="text-pink">(opcional)</small></Label>
                <Input
                  type="text"
                  id="dressCode"
                  name="dress_code"
                  value={state.dress_code}
                  onChange={setValue}
                  placeholder="Terno, smoking, casual, ..."
                />
              </div>
              <div>
                <Label>Observações <small className="text-pink">(opcional)</small></Label>
                <Input type="text" id="observations" value={state.observations} name="observations"
                  onChange={setValue} placeholder="Vá de uber" />
              </div>
              <div>  
                <Label>Instagram dos organizadores <small className="text-pink">(opcional)</small></Label>
                <div className="flex flex-col gap-2">
                  {instagramFields.map((value, index) => (
                      <Input
                        key={'instagram-' + index}
                        type="text"
                        id={`instagram-${index}`}
                        placeholder="@instagram"
                        value={value}
                        onChange={(e) => handleChangeField(index, e.target.value)}
                      />
                    ))}


                </div>
                <div className="flex justify-between">
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddField();
                    }}
                    className="text-pink text-[14px] font-semibold"
                  >
                    Adicionar outro
                  </Link>
                  {instagramFields.length > 1 &&
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveField();
                      }}
                      className="text-brand-500 text-[14px] font-semibold"
                    >
                      Remover
                    </Link>
                  }
                </div>
              </div> 
              <div> 
                <Label>Música de fundo (YouTube) <small className="text-pink">(opcional)</small></Label>
                <Input
                  type="text"
                  id="music"
                  name="background_music"
                  value={state.background_music}
                  onChange={setValue}
                  placeholder="https://www.youtube.com/watch?"
                />
              </div>
              <div>
                <Label>Iniciar música no segundo <small className="text-pink">(opcional)</small></Label>
                <Input type="text" value={state.start_background_music} name="start_background_music"
                  onChange={setValue} id="musicSegundo" placeholder="46" />
                
              </div>
            </FormCard>
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
              {!isLogin && (
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
        </div>
      </section>
    </>
  );
}
