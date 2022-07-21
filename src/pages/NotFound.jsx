import React from "react";
import { useNavigate } from "react-router-dom";
import pageNotFound from "../assets/undraw_page_not_found.svg";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
      <div className="flex w-full items-center justify-center min-h-screen bg-purple-5">
        <div className="flex items-center justify-center max-w-lg w-full mx-4 my-10 md:-16 lg:my-16">
          <div className="border border-gray-100 shadow-lg rounded-xl p-8 items-center bg-white">
            <div className="flex flex-col text-center items-center justify-center">
              <img src={pageNotFound} alt="" className="h-32" />
              <p className="text-3xl font-bold py-4">Oops! Sepertinya kamu tersesat nih</p>
                <button
                  onClick={() => navigate('/', { replace: true })}
                  className="flex items-center justify-center w-full py-2 mt-6 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-xl 
                                focus:shadow-lg focus:outline-none active:shadow-lg"
                >
                  Kembali ke Halaman Utama
                </button>
            </div>
          </div>
        </div>
      </div>
  );
}
