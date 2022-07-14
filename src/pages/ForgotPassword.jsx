import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ForgotPassPic from "../assets/undraw_forgot_password.svg";
import { FiAlertCircle } from 'react-icons/fi';
import configs from "../utils/configs";  
import LoadingSpin from '../components/LoadingSpin';

export default function ForgotPassword() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios({
        url: `${configs.apiRootURL}/request-forgot-password`,
        method: "POST",
        data: { email },
      });
      toast.success('Konfirmasi email telah terkirim, silahkan cek email kamu!', {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      navigate("/login",{replace:true});
    } catch (e) {
      if (e.response) setErrorMsg(e.response.message);
      else setErrorMsg("Terjadi Kesalahan. Silakan periksa koneksi anda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-purple-5">
      <Header title="Lupa Password" withoutSearchBar useBackButton />

      <div className="flex flex-col w-full px-4 py-6 lg:py-16 max-w-lg lg:mx-auto">
        <div className="border border-gray-100 shadow-lg rounded-xl p-8 items-center bg-white">
          <div className="flex flex-col text-center items-center justify-center">
            <img className="h-32" src={ForgotPassPic}></img>
            <p className="text-3xl font-bold py-4">Lupa Password</p>
            <p className="text-sm font-normal">
              Masukkan email kamu dan kami akan mengirim link untuk melakukan
              reset password
            </p>
            <form className="w-full my-4" onSubmit={handleForgotPassword}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className={`form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                border border-neutral-2 rounded-xl transition ease-in-out m-0 focus:text-gray-700 focus:outline-none
                ${
                  errorMsg
                    ? "border-red-600 hover:border-red-600"
                    : "border-neutral-2"
                }`}
                id="emailInput"
                placeholder="Masukkan email"
              />
              <div
                className={`flex items-center text-red-600 text-sm mt-2 ${
                  errorMsg ? "block" : "hidden"
                }`}
              >
                <FiAlertCircle className="mr-2" />
                <p>{errorMsg}</p>
              </div>
              <button
                disabled={ isLoading }
                className="flex items-center justify-center w-full py-2 mt-6 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-xl 
                    focus:shadow-lg focus:outline-none active:shadow-lg"
                type="submit"
              >
                Submit
              </button>
            </form>
            <button
              className="text-sm mt-3 text-purple-3 hover:text-purple-4"
              onClick={() => navigate(-1)}
            >
              { isLoading && <LoadingSpin /> }
              &#60; Kembali ke Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
