import PageMeta from "../../components/common/PageMeta";

import Input from "../../components/form/input/InputField";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FormCard from "../Tables/FormCard";
import Label from "../../components/form/Label";
import DatePicker from "../../components/form/date-picker";

import { SlArrowRight } from "react-icons/sl";
import { EnvelopeIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { UserIcon } from "../../icons";

import Switch from "../../components/form/switch/Switch";

import { Link } from "react-router";

import { useDropzone } from "react-dropzone";
// import Input from "../../components/form/form-elements/DefaultInputs"
export default function Home() {
  const [step, setStep] = useState(0);
  const [parent] = useAutoAnimate();

  const [showPassword, setShowPassword] = useState(false);

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

  const handleDrop = (files: File[]) => {
    console.log("Arquivos recebidos:", files);
  };

  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
    // Handle file uploads here
  };

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

                      {/* Text Content */}
                      <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                        {isDragActive
                          ? "Drop Files Here"
                          : "Drag & Drop Files Here"}
                      </h4>

                      <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                        Drag and drop your PNG, JPG, WebP, SVG images here or
                        browse
                      </span>

                      <span className="font-medium underline text-theme-sm text-brand-500">
                        Browse File
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
              icon={<SlArrowRight size={20} color="blue" />}
              onSubmit={nextStep}
            >
              <div>
                <Switch label={"cerinomia"} />
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
              buttonLabel="Próximo Passo"
              icon={<SlArrowRight size={20} color="blue" />}
              onSubmit={nextStep}
            >
              <div>{/* <DropzoneInput onDrop={handleDrop} /> */}</div>
            </FormCard>
          )}
          {step === 3 && (
            <FormCard
              stepText="passo 4"
              title="Detalhes finais"
              buttonLabel="Pular/Proximo passo"
              icon={<SlArrowRight size={20} color="blue" />}
              onSubmit={nextStep}
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
                <Input type="text" id="instagram" placeholder="@instagram" />
                <Link to="/login" className="text-blue-500 font-size-sm">
                  Adicionar outro
                </Link>
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
              title="Cadastro"
              buttonLabel="Criar Conta"
              icon={<SlArrowRight size={20} color="blue" />}
              onSubmit={nextStep}
            >
              <Label>Nome</Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Username"
                  className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
                  type="text"
                />
                <span className="absolute right-0 top-1/2 -translate-y-1/2  px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <UserIcon className="size-6" />
                </span>
              </div>
              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Input placeholder="info@gmail.com" type="text" />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2  px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    <EnvelopeIcon className="size-6" />
                  </span>
                </div>
              </div>
              <div>
                <Label>Senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-0 top-1/2"
                  >
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        <path
                          d="M10.6252 13.9582C10.6252 13.613 10.3453 13.3332 10.0002 13.3332C9.65498 13.3332 9.37516 13.613 9.37516 13.9582V15.2082C9.37516 15.5533 9.65498 15.8332 10.0002 15.8332C10.3453 15.8332 10.6252 15.5533 10.6252 15.2082V13.9582Z"
                          fill="#667085"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.0002 1.6665C7.58392 1.6665 5.62516 3.62526 5.62516 6.0415V7.604H4.5835C3.54796 7.604 2.7085 8.44347 2.7085 9.479V16.4578C2.7085 17.4933 3.54796 18.3328 4.5835 18.3328H15.4168C16.4524 18.3328 17.2918 17.4933 17.2918 16.4578V9.479C17.2918 8.44347 16.4524 7.604 15.4168 7.604H14.3752V6.0415C14.3752 3.62526 12.4164 1.6665 10.0002 1.6665ZM13.1252 6.0415V7.604H6.87516V6.0415C6.87516 4.31561 8.27427 2.9165 10.0002 2.9165C11.7261 2.9165 13.1252 4.31561 13.1252 6.0415ZM4.5835 8.854C4.23832 8.854 3.9585 9.13383 3.9585 9.479V16.4578C3.9585 16.8029 4.23832 17.0828 4.5835 17.0828H15.4168C15.762 17.0828 16.0418 16.8029 16.0418 16.4578V9.479C16.0418 9.13383 15.762 8.854 15.4168 8.854H4.5835Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    {/* {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )} */}
                  </button>
                </div>
              </div>
              <div>
                <Label>Password Input</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-0 top-1/2"
                  >
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                      >
                        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                        <path
                          d="M10.6252 13.9582C10.6252 13.613 10.3453 13.3332 10.0002 13.3332C9.65498 13.3332 9.37516 13.613 9.37516 13.9582V15.2082C9.37516 15.5533 9.65498 15.8332 10.0002 15.8332C10.3453 15.8332 10.6252 15.5533 10.6252 15.2082V13.9582Z"
                          fill="#667085"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.0002 1.6665C7.58392 1.6665 5.62516 3.62526 5.62516 6.0415V7.604H4.5835C3.54796 7.604 2.7085 8.44347 2.7085 9.479V16.4578C2.7085 17.4933 3.54796 18.3328 4.5835 18.3328H15.4168C16.4524 18.3328 17.2918 17.4933 17.2918 16.4578V9.479C17.2918 8.44347 16.4524 7.604 15.4168 7.604H14.3752V6.0415C14.3752 3.62526 12.4164 1.6665 10.0002 1.6665ZM13.1252 6.0415V7.604H6.87516V6.0415C6.87516 4.31561 8.27427 2.9165 10.0002 2.9165C11.7261 2.9165 13.1252 4.31561 13.1252 6.0415ZM4.5835 8.854C4.23832 8.854 3.9585 9.13383 3.9585 9.479V16.4578C3.9585 16.8029 4.23832 17.0828 4.5835 17.0828H15.4168C15.762 17.0828 16.0418 16.8029 16.0418 16.4578V9.479C16.0418 9.13383 15.762 8.854 15.4168 8.854H4.5835Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>

                    {/* {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )} */}
                  </button>
                </div>
              </div>
              <Link to={""}>Já possui conta?Entrar</Link>
            </FormCard>
          )}
        </div>
      </section>
    </>
  );
}
