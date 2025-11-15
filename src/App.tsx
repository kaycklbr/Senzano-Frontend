import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ClientHome from "./pages/Client/Home";
import Home from "./pages/Home/Home";
import Empreendimentos from "./pages/Empreendimentos/Empreendimentos";
import AdminEmpreendimentos from "./pages/Empreendimentos";
import EmpreendimentoForm from "./pages/EmpreendimentoForm";
import AdminLancamentos from "./pages/Lancamentos";
import LancamentoForm from "./pages/LancamentoForm";
import AdminPaginas from "./pages/Paginas";
import PaginaForm from "./pages/PaginaForm";
import AdminImoveis from "./pages/Imoveis";
import Anuncie from "./pages/Anuncie/Anuncie";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthProvider";
import ClientLayout from "./layout/ClientLayout";
import HomeLayout from "./layout/HomeLayout";
import Convites from "./pages/Convites/Convites";
import ConviteEdit from "./pages/Convites/ConviteEdit";
import Reset from "./pages/AuthPages/Reset";
import AuthLayout from "./pages/AuthPages/AuthPageLayout";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";
import SignInAs from "./pages/OtherPage/SignInAs";
import Property from "./pages/Property/Property";
import Lancamentos from "./pages/Lancamentos/Lancamentos";
import Sobre from "./pages/Sobre/Sobre";
import PropertyDetails from "./pages/Property/PropertyDetails";
import { useJsApiLoader } from '@react-google-maps/api'
import Contact from "./pages/Contact/Contact";
import PublicPage from "./pages/PublicPage";
import PublicPost from "./pages/PublicPost";

export default function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyANLIC3VX7fej4KVqqFQH_o-RYAFZxkCE0',
  })
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route element={<HomeLayout />}>
            <Route index path="" element={<Home mapLoaded={isLoaded} />} />
            <Route index path="/empreendimentos" element={<Empreendimentos />} />
            <Route index path="/empreendimentos/:slug" element={<PublicPage />} />
            <Route index path="/lancamentos" element={<Lancamentos />} />
            <Route index path="/lancamentos/:slug" element={<PublicPage />} />
            <Route index path="/fale-conosco" element={<Contact />} />
            <Route index path="/anuncie" element={<Anuncie />} />
            <Route index path="/quem-somos" element={<Sobre />} />
            <Route index path="/imovel/:id" element={<PropertyDetails />} />
            <Route index path="/empreendimentos/:slug" element={<PublicPost />} />
            <Route index path="/lancamentos/:slug" element={<PublicPost />} />
            <Route index path="/venda" element={<Property />} />
            <Route index path="/locacao" element={<Property />} />
            <Route index path="/:slug" element={<PublicPage />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/reset" element={<Reset />} />
            <Route path="/login" element={<SignInForm />} />
            {/* <Route path="/signup" element={<SignUpForm />} /> */}
          </Route>

          {/* Dashboard Layout */}
          <Route path="admin" element={<AppLayout />}>
            {/* <Route index path="" element={<Home />} /> */}
            <Route path="" element={<Navigate to="/admin/empreendimentos"/>} />
            <Route path="profile" element={<UserProfiles />} />
            <Route path="empreendimentos" element={<AdminEmpreendimentos />} />
            <Route path="empreendimentos/novo" element={<EmpreendimentoForm />} />
            <Route path="empreendimentos/editar/:id" element={<EmpreendimentoForm />} />
            <Route path="lancamentos" element={<AdminLancamentos />} />
            <Route path="lancamentos/novo" element={<LancamentoForm />} />
            <Route path="lancamentos/editar/:id" element={<LancamentoForm />} />
            <Route path="paginas" element={<AdminPaginas />} />
            <Route path="paginas/nova" element={<PaginaForm />} />
            <Route path="paginas/editar/:id" element={<PaginaForm />} />
            <Route path="imoveis" element={<AdminImoveis />} />
            

            {/* Others Page */}
            {/* <Route path="convites" element={<Convites />} />
            <Route path="convites/:id" element={<ConviteEdit />} /> */}
            
            {/* <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} /> */}

            {/* Forms */}
            {/* <Route path="form-elements" element={<FormElements />} /> */}

            {/* Tables */}

            {/* Ui Elements */}
            {/* <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} /> */}

            {/* Charts */}
            {/* <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
