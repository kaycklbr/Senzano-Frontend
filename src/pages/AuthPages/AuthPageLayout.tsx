import React, { useContext } from "react";
import GridShape from "../../components/common/GridShape";
import { Link, Navigate, Outlet } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import logo from "../../../logo.png"
import { AuthContext } from "../../context/AuthProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { authenticated } = useContext(AuthContext);

  if(authenticated) return <Navigate to="/admin" replace />
  
  return (
    <div className="relative p-6 bg-white h-screen z-1 dark:bg-gray-900 sm:p-0">
        {/* {children} */}
        <Outlet/>
    </div>
  );
}
