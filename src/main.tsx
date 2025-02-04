import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContextProvider } from "./context/useAuthContext.tsx";

import Home from "./views/Home.tsx";
import App from "./views/App.tsx";
import Plans from "./views/Plans.tsx";
import Login from "./views/Login.tsx";
import Signup from "./views/Signup.tsx";

import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

import './assets/styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Signout from "./views/Signout.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
          <Route path="/plans" element={<Plans />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/log-in" element={<Login />} />
          <Route path="/auth/sign-up" element={<Signup />} />
          <Route path="/auth/sign-out" element={<Signout />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);