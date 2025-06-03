import { Link } from "react-router";
import logo from "../../../logo.png"

const Header: React.FC = () => {

  // const { authenticated } = useContext(AuthContext);

  // if(!authenticated) return <Navigate to="/login" replace />

  return (
    <header className="shadow-md w-full h-20 bg-white  z-50 border-b dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-center h-full ">
        <div className="md:px-8 max-w-6xl px-4 flex items-center justify-between gap-2 ml-4 mr-2 py-1 h-full dark:border-gray-800 ">
          <Link to="/" className="">
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

        </div>
      </div>
    </header>
  );
};

export default Header;