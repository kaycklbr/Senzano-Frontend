import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ClientHome from "./pages/Client/Home";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthProvider";
import ClientLayout from "./layout/ClientLayout";
import Convites from "./pages/Convites/Convites";
import ConviteEdit from "./pages/Convites/ConviteEdit";
import Reset from "./pages/AuthPages/Reset";
import AuthLayout from "./pages/AuthPages/AuthPageLayout";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/reset" element={<Reset />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Route>

          <Route element={<ClientLayout />}>
            <Route index path="" element={<Navigate to="/admin" />} />
            <Route path="/criar-convite" element={<ClientHome />} />
          </Route>

          

          {/* Dashboard Layout */}
          <Route path="admin" element={<AppLayout />}>
            {/* <Route index path="" element={<Home />} /> */}
            <Route path="" element={<Navigate to="/admin/convites"/>} />
            <Route path="profile" element={<UserProfiles />} />

            {/* Others Page */}
            <Route path="convites" element={<Convites />} />
            <Route path="convites/:id" element={<ConviteEdit />} />
            
            {/* <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} /> */}

            {/* Forms */}
            {/* <Route path="form-elements" element={<FormElements />} /> */}

            {/* Tables */}
            {/* <Route path="basic-tables" element={<BasicTables />} /> */}

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

          

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
