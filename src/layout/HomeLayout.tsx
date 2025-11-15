import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const HomeLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default HomeLayout;