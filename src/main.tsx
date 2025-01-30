import App from './views/App.tsx';
import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import Navigation from "./components/Navigation.tsx";
import './assets/styles/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <div className="flex flex-col h-screen">
      <Navigation/>
      <Routes>
        <Route path="/app" element={<App/>} />
      </Routes>
    </div>
  </BrowserRouter>
);