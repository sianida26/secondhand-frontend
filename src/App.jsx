import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductForm from './pages/ProductForm';
import BuyerInfo from './pages/BuyerInfo';
import Profile from "./pages/Profile";
import AkunSaya from "./pages/AkunSaya";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buat-produk" element={<ProductForm />} />
      <Route path="/edit-produk" element={<ProductForm />} />
      <Route path="/buyerinfo" element={<BuyerInfo />} />
      <Route path="/akun-saya" element={<AkunSaya />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
