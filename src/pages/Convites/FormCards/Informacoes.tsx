import { BtnBold, BtnBulletList, BtnItalic, BtnNumberedList, EditorProvider, BtnRedo, BtnStrikeThrough, BtnUnderline, BtnUndo, Editor, Toolbar } from "react-simple-wysiwyg";
import FormCard from "../../../components/common/FormCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { useDropzone } from "react-dropzone";
import { FaX } from "react-icons/fa6";

interface Props {
  title: string;
  description: string;
  resume?: string;
  eventDate: string;
  gettingStarted?: boolean;
  mainImage?: { file?: File; url: string; id?: string };
  setTitle: (e: any) => void;
  setEventDate: (e: any) => void;
  onChange: (e: any) => void;
  onImageDrop: (files: File[]) => void;
  onRemoveImage: () => void;
  onSubmit?: (e: any) => void;
  onBack?: () => void;
  formCardTitle?: string;
  formCardDescription?: string;
  formCardButtonLabel?: string | null;
}

export default function Informacoes({
  title,
  description,
  resume,
  eventDate,
  gettingStarted,
  mainImage,
  setTitle,
  setEventDate,
  onChange,
  onImageDrop,
  onRemoveImage,
  onSubmit,
  onBack,
  formCardTitle,
  formCardDescription,
  formCardButtonLabel = null 
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
  });

  return (
    <FormCard 
        stepText={formCardDescription} 
        onBack={onBack} 
        title={formCardTitle || "Informações do Convite"} 
        onSubmit={onSubmit}
        buttonLabel={formCardButtonLabel}>
      <div className="lists-decorators">
        <Label>Nome do evento</Label>
        <Input
        type="text"
        name="title"
        required
        value={title}
        onChange={(e) => setTitle ? setTitle(e) : onChange(e)}
        placeholder="João e Maria, M & H, ..."
        />
      </div>

      <div>
        <Label>
          Foto principal{" "}
          <small>(Adicione uma foto quadrada de preferência para melhor enquadramento)</small>
          &nbsp;<span className="text-pink">(opcional)</span>
        </Label>

        <div
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed p-7 lg:p-10 ${
            isDragActive
              ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
              : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          }`}
        >
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center m-0!">
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699Z" />
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
        <div className="mt-4 relative">
          <div
            onClick={onRemoveImage}
            className="cursor-pointer w-7 h-7 bg-[#000000AB] absolute top-2 right-2 flex items-center justify-center rounded-4xl"
          >
            <FaX className="text-white text-sm" />
          </div>
          <img
            src={mainImage.url}
            alt="Preview"
            className="max-w-full h-auto rounded-xl border"
          />
        </div>
      )}

      <div>
        <Label htmlFor="event_date">Data do evento</Label>
        <Input
          type="date"
          name="event_date"
          required
          value={eventDate}
          onChange={(e) => setEventDate ? setEventDate(e) : onChange(e)}
          placeholder="Selecione a data"
        />
      </div>

      <div className="">
        <Label htmlFor="description">Frase inicial <span className="text-pink">(opcional)</span></Label>
        {gettingStarted ? <Input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Venha celebrar conosco nessa festa..."
            />
            :
            <EditorProvider>
                <Editor style={{color: 'black'}} value={description} onChange={(e) => onChange({
                    currentTarget: {
                        name: 'description',
                        value: e.target.value
                    }
                })}>
                    <Toolbar>
                        <BtnUndo/>
                        <BtnRedo/>
                        <BtnBold/>
                        <BtnItalic/>
                        <BtnUnderline/>
                        <BtnStrikeThrough/>
                        <BtnNumberedList/>
                        <BtnBulletList/>
                    </Toolbar>
                </Editor>
            </EditorProvider>
            }
      </div>

      {!gettingStarted && <div className="list-decorators">
        <Label htmlFor="resume">Introdução <span className="text-pink">(opcional)</span></Label>
        <EditorProvider>
            <Editor style={{color: 'black'}} value={resume} onChange={(e) => onChange({
                currentTarget: {
                    name: 'resume',
                    value: e.target.value
                }
            })}>
                <Toolbar>
                    <BtnUndo/>
                    <BtnRedo/>
                    <BtnBold/>
                    <BtnItalic/>
                    <BtnUnderline/>
                    <BtnStrikeThrough/>
                    <BtnNumberedList/>
                    <BtnBulletList/>
                </Toolbar>
            </Editor>
        </EditorProvider>
      </div>}
    </FormCard>
  );
}
