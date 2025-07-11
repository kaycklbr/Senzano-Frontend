import GridShape from "../../components/common/GridShape";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import api from "../../services/api";
import Spinner from "../../components/common/Spinner";

export default function SignInAs() {

  const [ loading, setLoading ] = useState(true);

  const [params] = useSearchParams();

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();


  useLayoutEffect(() => {

    const validateToken = async () => {
      setLoading(true)
      const token = params.get('token') || '';
      try{
        await api.post('/jwt-auth/v1/token/validate', {}, {
          headers:{ 
            'Authorization': 'Bearer '+token
          }
        });
        setToken(token);
        setLoading(false)
      }catch(e){
      }

    }

    validateToken();

  }, []);

  if(loading) return <div className="w-full flex justify-center mt-10">
    <Spinner/>
  </div>;

  return <Navigate to={'/'} />
}
