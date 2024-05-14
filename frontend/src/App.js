

import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import MapApp from "./components/MapApp"
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequiredAuth from "./components/RequiredAuth";


function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route  element={<RequiredAuth />}>
         <Route index element={<MapApp />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
