import { useContext, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import logo from "../../../logo.png"
import Button from "../ui/button/Button";
import { errorControl } from "../../services/utils";
import { toast } from "react-toastify";
import { register } from "../../auth/auth";
import { AuthContext } from "../../context/AuthProvider";


export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { login } = useContext(AuthContext);

  const handleSave = async () => {
    setLoading(true);
    try{
      const { data } = await register(name, email, password);
      await login(email, password);
    }catch(e){
      toast(errorControl(e) || 'Erro ao cadastrar. Tente novamente mais tarde.', { type: 'error'});
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
              Cadastrar
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crie sua conta e crie seus convites!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                <div >
                  <Label>
                    Nome<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="fname"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    name="fname"
                    placeholder="Digite seu nome"
                  />
                </div>
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    name="email"
                    placeholder="Digite seu email"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Senha<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={e => setPassword(e.currentTarget.value)}
                      type={showPassword ? "text" : "password"}
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
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  Ao criar uma conta, você concorda com os {" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Termos e Condições,
                    </span>{" "}
                    e com nossa{" "}
                    <span className="text-gray-800 dark:text-white">
                      Política de Privacidade
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button onClick={handleSave} loading={loading} className="w-full">
                    Cadastrar
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Já possui uma conta? {""}
                <Link
                  to="/login"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
