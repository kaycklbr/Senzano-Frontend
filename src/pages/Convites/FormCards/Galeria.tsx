import { useDropzone } from "react-dropzone";
import { FaX } from "react-icons/fa6";
import FormCard from "../../../components/common/FormCard";

interface Props {
  images: { file?: File; url: string; id?: number }[];
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (index: number) => void;
  onSubmit?: (e: any) => void;
  onBack?: () => void;
  icon?: any;
  formCardTitle?: string;
  formCardDescription?: string;
  formCardButtonLabel?: string | null;
}

export default function Galeria({ images, onDrop, onRemove, onSubmit,
  onBack,
  icon,
  formCardTitle,
  formCardDescription,
  formCardButtonLabel = null }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
  });

  return (
    <FormCard stepText={formCardDescription} 
        onBack={onBack} 
        title={formCardTitle || "Galeria de fotos"} 
        onSubmit={onSubmit}
        icon={icon}
        buttonLabel={formCardButtonLabel}>
      <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-4">
        {/* Botão de adicionar foto */}
        <div
          {...getRootProps()}
          className={`dropzone rounded-xl flex flex-col items-center justify-center border-2 border-dashed ${
            isDragActive
              ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
              : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
          } w-full aspect-square p-2 transition`}
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
          <div
            key={"gallery_" + index}
            className="relative w-full aspect-square rounded-md overflow-hidden border-2 border-gray-300"
          >
            <div
              onClick={() => onRemove(index)}
              className="cursor-pointer w-5 h-5 bg-[#000000AB] absolute top-0.5 right-0.5 flex items-center justify-center rounded-4xl"
            >
              <FaX className="text-white text-xs" />
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
  );
}
