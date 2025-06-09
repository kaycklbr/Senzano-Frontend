import PageMeta from "../../components/common/PageMeta";

import Input from "../../components/form/input/InputField";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "./FormCard";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/date-picker";
import { EnvelopeIcon, TimeIcon } from "../../icons";
import { UserIcon } from "../../icons";

import Switch from "../../components/form/switch/Switch";

import { Link, useNavigate, useParams } from "react-router";
import { FaAngleLeft, FaX } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";
import api from "../../services/api";
import { login, setTokens } from "../../auth/auth";
import { toast } from "react-toastify";
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
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ confirmPassword, setConfirmPassword ] = useState();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ saveLoading, setSaveLoading ] = useState<boolean>(false);

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
    start_background_music: ''
  });

  const params = useParams();
  const fetchConvite = async () => {
    setLoading(true);
    try{
      const { data } = await api.get('convitin/v1/convites/'+params.id);
      setState(data);
      setMainImage(data.main_image);
      setImages(data.gallery);
      setInstagramFields(data.owner_instagram.split(','))
    }catch(e){
      
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {

    const fetchTemplate = async () => {
      const { data } = await api.get('convitin/v1/templates');
      setTemplates(data);
    }

    fetchTemplate();
    isEdit && fetchConvite();
  }, []);

  const setValue = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setState(prev => ({...prev, [name]: value}));
  }

  const removeItem = (indexToRemove) => {
    setImages(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const navigate = useNavigate();

  const handleSave = async () => {
    setSaveLoading(true);
    const data = {...state};
    data.owner_instagram = instagramFields.join(',');

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if(mainImage?.id){
      formData.delete('main_image');
    }else{
      formData.set('main_image', mainImage.file);
    }


    formData.delete('gallery');
    for(let img of images){
      if(img?.id){
        formData.append('existing_gallery[]', img.id);
      }else{
        formData.append('gallery[]', img.file);
      }
    }


    try{
      if(isEdit){
        const response = await api.post('convitin/v1/convites/edit/'+params.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast('Convite atualizado com sucesso!', { type: 'success' });
      }else{
        const response = await api.post('convitin/v1/convites', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast('Convite criado com sucesso!', { type: 'success' });
        navigate('/admin/convites/'+response.data.id);

      }

      await fetchConvite();

    }catch(e){
      toast(e.message, { type: 'error' });
    }finally{
      setSaveLoading(false);
    }

  }

  if(loading){
    return <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  }

  return (
    <>
      <section className="h-full md:h-auto flex flex-col items-center justify-center w-full">
          <div className="w-full h-full bg-white 
          md:h-auto rounded-xl shadow-md
          p-4">

            <div>
                <Switch label={"Ativar convite"} color="pink" defaultChecked={state.status == 'publish'}
                  onChange={(v) => setValue({currentTarget: {name: 'status', value: !!v ? 'publish' : 'draft'}})}  />
              </div>

          </div>

          <div className="w-full h-full mt-3 bg-white 
          md:h-auto rounded-xl shadow-md
          p-4">
            <FormCard
                title="Modelos"
                buttonLabel={null}
              >
                <div className="flex gap-3 overflow-x-auto">
                  {templates.map((t, index) => (
                    <div key={'template_' + index} className="flex flex-col items-center min-w-[100px] max-w-[120px] min-h-[140px] ">
                      <img
                        src={t.main_image}
                        className="object-cover w-[100px] h-[140px] rounded-md border-1 border-gray-300"
                      />
                      <h5 className="text-sm text-black font-bold text-center">{t.title}</h5>
                      <div onClick={() => setState(prev => ({...prev, template_id: t.id}))} className={"cursor-pointer py-1 px-2 text-white text-xs rounded-2xl transition-colors " + (state.template_id == t.id ? 'bg-brand-500' : 'bg-pink-300 hover:bg-pink-400')}>
                        {state.template_id == t.id ? 'Selecionado' : 'Selecionar'}
                      </div>
                    </div>
                  ))}
                </div>
              </FormCard>

          </div>

          <div ref={parent} className="w-full h-full mt-3 bg-white 
          md:h-auto rounded-xl shadow-md
          p-4">
              <FormCard
                title="Informações do Convite"
                buttonLabel={null}
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
                    name="description"
                    required
                    value={state.description}
                    onChange={setValue}
                    placeholder="Venha celebrar conosco nessa festa..."
                  />
                </div>
              </FormCard>

            <FormCard
              buttonLabel={null}
              title="Localização"
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
                    value={state.ceremony_date}
                    required={state.enable_ceremony}
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

        
            <FormCard
              buttonLabel={null}
              title="Galeria de fotos"
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
              <div key={'gallery_' + index} className="relative w-full aspect-square  rounded-md overflow-hidden border-2 border-gray-300">
                <div onClick={() =>removeItem(index)} className="cursor-pointer w-5 h-5 bg-[#000000AB] absolute top-0.5 right-0.5 flex items-center justify-center rounded-4xl">
                  <FaX className="text-white text-xs"/>
                </div>
                <img
                  src={imgObj.url}
                  alt={`Foto ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
            </FormCard>


            <FormCard
              title="Detalhes finais"
              buttonLabel={'Salvar'}
              buttonLoading={saveLoading}
              onSubmit={handleSave}
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
                    required
                    className="rounded-l-none"
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

        </div>
      </section>
    </>
  );
}
