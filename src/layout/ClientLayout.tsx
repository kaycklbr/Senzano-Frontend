import { Outlet } from "react-router";
import Header from "../pages/Client/Header";

const LayoutContent: React.FC = () => {
  return (
    <div className="mb-5">
      <Header />
      <div>
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
