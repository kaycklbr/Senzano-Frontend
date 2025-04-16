import { Link } from "react-router";

const Header: React.FC = () => {

  // const { authenticated } = useContext(AuthContext);

  // if(!authenticated) return <Navigate to="/login" replace />

  return (
    <header className="top-0 flex w-full bg-white h-[80px] z-99999 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-center grow ">
        <div className="md:ml-20 flex items-center justify-between gap-2 ml-4 mr-2 py-1 h-full dark:border-gray-800 ">
          <Link to="/" className="">
            <img
              className="dark:hidden"
              src="./images/logo/logo.svg"
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