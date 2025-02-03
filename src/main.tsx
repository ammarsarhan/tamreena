import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";

import Home from './views/Home.tsx';
import App from './views/App.tsx';
import Plans from './views/Plans.tsx';
import Navigation from "./components/Navigation.tsx";

import './assets/styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContextProvider } from "./context/useAuthContext.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <main className="flex flex-col h-screen">
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/app" element={<App/>} />
          <Route path="/plans" element={<Plans/>} />
        </Routes>
      </main>
    </AuthContextProvider>
  </BrowserRouter>
);