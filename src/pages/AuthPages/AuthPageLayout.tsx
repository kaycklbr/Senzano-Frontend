import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

export default function AuthLayout() {
  
  return (
    <div className="relative p-6 bg-white h-screen z-1 dark:bg-gray-900 sm:p-0">
        <Outlet/>
    </div>
  );
}
