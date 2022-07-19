import { useEffect } from "react"
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from "./pages/Logout";
import ProductForm from './pages/ProductForm';
import BuyerInfo from './pages/BuyerInfo';
import Profile from "./pages/Profile";
import AkunSaya from "./pages/AkunSaya";
import PreviewProduk from "./pages/PreviewProduk";
import PreviewProdukBuyer from "./pages/PreviewProdukBuyer";
import DaftarJualSaya from "./pages/DaftarJualSaya";
import EmailConfirm from "./pages/EmailConfirm";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Wishlist from "./pages/Wishlist";
import Notifikasi from "./pages/Notifikasi";

import configs from './utils/configs'
import { setNotifications } from './redux/slices/notificationSlice'

function App() {

  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  const fetchNotifications = async () => {
    try {
      const response = await axios({
        url: `${configs.apiRootURL}/notifications`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 20000, // seconds
      });
      dispatch(setNotifications(response.data));
    } catch (e){

    } finally {

    }
  }

  useEffect(() => {
    if (!token) return;
    fetchNotifications()
  }, [token])

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buat-produk" element={<ProductForm />} />
      <Route path="/edit-produk" element={<ProductForm />} />
      <Route path="/penawaran/:id" element={<BuyerInfo />} />
      <Route path="/accept-produk" element={<BuyerInfo />} />
      <Route path="/akun-saya" element={<AkunSaya />} />
      <Route path="/profil" element={<Profile />} />
      <Route path="/preview-produk" element={<PreviewProduk />} />
      <Route path="/produkku" element={<DaftarJualSaya />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/waiting-email-confirmation" element={<EmailConfirm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/:token" element={<NewPassword />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/produk/:id" element={<PreviewProdukBuyer />} />
      <Route path="/notifikasi" element={ <Notifikasi /> } />
    </Routes>
  );
}

export default App;
