import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from './views/App.tsx';
import './assets/styles/index.css';
import Navigation from "./components/Navigation.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/app" element={<App/>} />
    </Routes>
  </BrowserRouter>
);