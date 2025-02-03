import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthContextProvider } from "./context/useAuthContext.tsx";

import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

import './assets/styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
          <Route path="/*" element={<MainLayout />} />
          <Route path="/auth/*" element={<AuthLayout />} />
        </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);