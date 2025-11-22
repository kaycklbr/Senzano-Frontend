import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import { ConfigProvider } from "../context/ConfigContext";

const HomeLayout: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="w-full min-h-screen">
        <Header/>
        <Outlet />
        <Footer/>
      </div>
    </ConfigProvider>
  );
};

export default HomeLayout;