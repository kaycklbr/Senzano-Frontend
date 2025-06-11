import { useContext, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import logo from "../../../logo.png"
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";
import { errorControl } from "../../services/utils";
import api from "../../services/api";


export default function ResetPasswordForm({ login: email, auth_key: key }) {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await api.post('convitin/v1/reset', {
        login: email,
        key,
        password
      });

      await login(email, password);
      toast('Senha atualizada com sucesso!', { type: 'success' })
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
                    E-mail
                  </Label>
                  <Input disabled value={email}/>


                  <Label className="mt-3">
                    Senha <span className="text-error-500">*</span>{" "}
                  </Label>

                  <div className="relative">
                    <Input
                      value={password} required onChange={e => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua nova senha"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button type="submit" loading={loading} className="w-full" size="sm">
                    Atualizar senha
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
