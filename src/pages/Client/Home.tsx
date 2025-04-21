import PageMeta from "../../components/common/PageMeta";

import Input from "../../components/form/input/InputField";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "../Tables/FormCard";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/date-picker";
import { EnvelopeIcon } from "../../icons";
import { UserIcon } from "../../icons";

import Switch from "../../components/form/switch/Switch";

import { Link } from "react-router";
import { FaAngleLeft } from "react-icons/fa6";

import { useDropzone } from "react-dropzone";
// import Input from "../../components/form/form-elements/DefaultInputs"
export default function Home() {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [instagramFields, setInstagramFields] = useState([""]);

  function handleAddField() {
    setInstagramFields([...instagramFields, ""]);
  }

  function handleChangeField(index: number, value: string) {
    const newFields = [...instagramFields];
    newFields[index] = value;
    setInstagramFields(newFields);
  }
  // const nextStep = () => setStep((prev) => prev + 1);
  const nextStep = () => {
    console.log("🟢 Botão clicado - tentando ir para o próximo passo...");
    setStep((prev) => {
      console.log("🔄 Step anterior:", prev);
      const newStep = prev + 1;
      console.log("✅ Novo step:", newStep);
      return newStep;
    });
  };
  const [images, setImages] = useState([]);

  const handleDrop = (files: File[]) => {
    console.log("Arquivos recebidos:", files);
  };

  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
    // Handle file uploads here
  };
  const toggleIsLogin = () => {
    setIsLogin((prev) => !prev);
  };
  function handleBackStep() {
    setStep(prev => prev - 1);
  }
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });
  return (
    <>
      <PageMeta title={"Convitin"} description="Crie seu convite" />
      <section className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
        <div ref={parent} className="w-full max-w-xl">
          <p className="mb-4 text-sm text-gray-500">
            DEBUG: passo atual = {step}
          </p>

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
                  <Label htmlFor="eventName">Nome do evento</Label>
                  <Input
                    type="text"
                    id="eventName"
                    placeholder="João e Maria, M & H, ..."
                  />
                </div>

                <div>
                  <Label>Foto principal</Label>

                  <form
                    {...getRootProps()}
                    className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
                    id="demo-upload"
                  >
                    {/* Hidden Input */}
                    <input {...getInputProps()} />

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
                        Browse File
                      </span>
                      <span className="font-medium text-pink">
                        Escolha sua foto
                      </span>
                    </div>
                  </form>
                </div>

                <div>
                  <DatePicker
                    id="date-picker"
                    label="Data do evento"
                    placeholder="Selecione a data"
                  />
                </div>

                <div>
                  <Label htmlFor="eventPhrase">Frase inicial</Label>
                  <Input
                    type="text"
                    id="eventPhrase"
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
                <Switch label={"cerinomia"} color="pink" />
              </div>
              <div className="flex gap-4 ">
                <DatePicker id="date-picker" label={"Data do evento"} />
                <div>
                  <Label htmlFor="tm">Hora do evento</Label>
                  <Input type="time" id="tm" label="Hora do evento" />
                </div>
              </div>
              <Label htmlFor="address">Local </Label>
              <Input type="text" id="address" placeholder="Clube de eventos" />
              <Label htmlFor="fulladdress">Enderenço </Label>
              <Input
                type="text"
                id="fullAddress"
                placeholder="Rua fulano 123"
              />

              <div>
                <Switch label={"Festa"} />
              </div>

              <div className="flex gap-4 ">
                <DatePicker id="date-picker" label={"Data do evento"} />
                <div>
                  <Label htmlFor="tm">Hora do evento</Label>
                  <Input type="time" id="tm" />
                </div>
              </div>
              <Label htmlFor="address">Local </Label>
              <Input type="text" id="address" placeholder="Clube de eventos" />
              <Label htmlFor="fulladdress">Enderenço </Label>
              <Input
                type="text"
                id="fullAddress"
                placeholder="Rua fulano 123"
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
    {images.length === 0 ? (
      <form
        {...getRootProps()}
        className={`dropzone rounded-xl flex flex-col items-center justify-center border-2 border-dashed ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        } w-24 h-24 p-4 transition`}
        id="demo-upload"
      >
        <input {...getInputProps()} />
        <div className="dz-message flex flex-col items-center m-0">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                className="fill-current"
                width="24"
                height="24"
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
          <span className="text-xs font-medium text-pink">
            Escolha sua foto
          </span>
        </div>
      </form>
    ) : (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-24 h-24 rounded-md overflow-hidden border-2 border-gray-300"
          >
            <img
              src={img.url}
              alt={`Foto ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    )}
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
                <Label htmlFor="website">URL do convite</Label>
                <Input
                  type="url"
                  id="website"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label>Dress Code</Label>
                <Input
                  type="text"
                  id="dressCode"
                  placeholder="João e Maria, M & H, ..."
                />
                <Label>Observações</Label>
                <Input type="text" id="observations" placeholder="Vá de uber" />
                <Label>Instagram dos organizadores</Label>

                {/* <Input type="text" id="instagram" placeholder="@instagram" />
                <Link to="/login" className="text-pink font-size-sm">
                Adicionar outro
                </Link> */}
                <div className="flex flex-col gap-4">
                              {instagramFields.map((value, index) => (
                      <Input
                        key={index}
                        type="text"
                        id={`instagram-${index}`}
                        placeholder="@instagram"
                        value={value}
                        onChange={(e) => handleChangeField(index, e.target.value)}
                      />
                    ))}

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

                </div>
                <Label>Música de fundo (YouTube)</Label>
                <Input
                  type="text"
                  id="music"
                  placeholder="https://www.youtube.com/watch?"
                />
                <Label>Iniciar música no segundo</Label>
                <Input type="text" id="musicSegundo" placeholder="46" />
              </div>
            </FormCard>
          )}

          {step === 4 && (
            
            <FormCard
  stepText="Passo Final"
  title={isLogin ? "Login" : "Cadastro"}
  buttonLabel={isLogin ? "Entrar" : "Criar Conta"}
  icon={<FaAngleLeft className="text-blue-dark" />}
  onSubmit={nextStep}
  onBack={handleBackStep}
  footer={
    <div className="flex justify-center gap-2">
      <p className="text-black">
        {isLogin ? "Não possui uma conta?" : "Já possui uma conta?"}
      </p>
      <button
        onClick={toggleIsLogin}
        type="button"
        className="text-blue-dark font-semibold"
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
        <Input id="username" placeholder="Nome de usuário" type="text" />
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
      <Input id="email" placeholder="info@gmail.com" type="email" />
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
