import { Outlet } from "react-router";
import Header from "../pages/Client/Header";

const LayoutContent: React.FC = () => {
  return (
    <div className="flex w-screen h-screen flex-col">
      <Header />
      <div className="flex-1 h-full overflow-y-auto bg-white md:bg-gray-100 px-0  md:px-2 py-0 md:py-4">
        <Outlet />
      </div>
    </div>
  );
};

const ClientLayout: React.FC = () => {

  // const { authenticated } = useContext(AuthContext);

  // if(!authenticated) return <Navigate to="/login" replace />

  return (
    <>
      <LayoutContent />
    </>
  );
};

export default ClientLayout;
