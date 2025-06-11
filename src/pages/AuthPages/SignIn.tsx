import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Navigate } from "react-router";

export default function SignIn() {

  return (
    <>
      <PageMeta title={"Convitin"} description="Crie seu convite" />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
