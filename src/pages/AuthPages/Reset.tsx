import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate, useLocation } from "react-router";
import ResetForm from "../../components/auth/ResetForm";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
// import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default function Reset() {

  const searchParams: any = new URLSearchParams(useLocation().search);
  const login = searchParams.get('login');
  const key = searchParams.get('key');
  return (
    <>
        {(login && key) ? 
        <ResetPasswordForm login={login} auth_key={key} />
        :
        <ResetForm />
        }
    </>
  );
}
