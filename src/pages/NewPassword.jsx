import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import NewPassPic from "../assets/Password_Isometric.svg";

import configs from "../utils/configs";
import Header from "../components/Header";
import LoadingSpin from "../components/LoadingSpin";

export default function NewPassword() {
  const navigate = useNavigate();
  
  const {token} = useParams();

  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConf] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorPwd, setErrorPwd] = useState("");

  const handleNewPassword = async (event) => {
    event.preventDefault();
    if (password !== password_confirmation) {setErrorPwd("Password tidak cocok"); return;}
    setLoading(true);
    try {
      await axios({
        url: `${configs.apiRootURL}/reset-password`,
        method: "POST",
        data: { token, password, password_confirmation },
      });
      toast.success("Password berhasil diubah!", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login", { replace: true });
    } catch (e) {
      if (e.response) setErrorMsg(e.response.message);
      else setErrorMsg("Terjadi Kesalahan. Silakan periksa koneksi anda");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-purple-5">
      <Header title="Reset Password" withoutSearchBar useBackButton />

      <div className="flex flex-col w-full px-4 py-6 lg:py-16 max-w-lg lg:mx-auto">
        <div className="border border-gray-100 shadow-lg rounded-xl p-8 items-center bg-white">
          <div className="flex flex-col text-center items-center justify-center">
            <img className="h-48" src={NewPassPic}></img>
            <p className="text-3xl font-bold py-4">Reset Password</p>
            <p className="text-sm font-normal">
              Masukkan password baru kamu dan lakukan konfirmasi password
            </p>
            <form className="w-full my-4" onSubmit={handleNewPassword}>
              <div className="shadow-sm -space-y-px">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-2 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-indigo-500 focus:border-purple-4 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
                <input
                  onChange={(e) => setPasswordConf(e.target.value)}
                  type="password"
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-2 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-indigo-500 focus:border-purple-4 focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                />
              </div>
              <div
                className={`flex items-center text-red-600 text-sm mt-2 
                  ${
                    (errorMsg ? "block" : errorPwd ? "block" : "hidden")
                  }`}
              >
                <FiAlertCircle className="mr-2" />
                <p>{errorMsg}</p>
              </div>
              <button
                disabled={isLoading}
                className="flex items-center justify-center w-full py-2 mt-6 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-xl 
                    focus:shadow-lg focus:outline-none active:shadow-lg"
                type="submit"
              >
                {isLoading && <LoadingSpin />}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
