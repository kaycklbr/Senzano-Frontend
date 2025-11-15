import { useContext, useState } from "react";
import { Link, Navigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import logo from "../../../logo.png"
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthProvider";


export default function SignInForm() {

  const { authenticated } = useContext(AuthContext);

  if(authenticated) return <Navigate to="/admin" replace />

  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast('Logado com sucesso!', { type: 'success' })
    } catch (e) {
      toast(e.response.data.message, { type: 'error' });
    } finally {
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
              Entrar
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input value={email} required type="email" onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" />
                </div>
                <div>
                  <Label>
                    Senha <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      value={password} required onChange={e => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
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
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div> */}

                <div>
                  <Button type="submit" loading={loading} className="w-full" size="sm">
                    Entrar
                  </Button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
