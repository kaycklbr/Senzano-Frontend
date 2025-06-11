import { useState } from "react";
import { Link } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import logo from "../../../logo.png"
import { toast } from "react-toastify";
import { errorControl } from "../../services/utils";
import api from "../../services/api";


export default function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await api.post('convitin/v1/send-reset', {
        email
      });
      toast('Link enviado com sucesso!', { type: 'success' })
    }catch(e){
      toast(errorControl(e), { type: 'error'});
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <Link to="/" className="self-center mb-10 mt-5">
        <img
          className="dark:hidden w-40"
          src={logo}
          alt="Logo"
        />
        <img
          className="hidden dark:block"
          src="./images/logo/logo-dark.svg"
          alt="Logo"
        />
      </Link>
        <div>
        
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Recuperar senha
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recupere sua senha
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input value={email} required type="email" onChange={e => setEmail(e.target.value)} placeholder="info@gmail.com" />
                </div>
                <div>
                  <Button type="submit" loading={loading} className="w-full" size="sm">
                    Enviar link
                  </Button>
                </div>

              </div>
            </form>

            <div className="mt-5 flex justify-center">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Já possui uma conta? {""}
                <Link
                  to="/login"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Entre
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
