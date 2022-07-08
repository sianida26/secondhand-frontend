import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import EmailPic from "../assets/undraw_mailbox.svg";

export default function EmailConfirm() {
  return (
    <div className="w-screen min-h-screen bg-purple-5">
      <Header title="Konfirmasi Email" withoutSearchBar useBackButton />

      <div className="flex flex-col w-full px-4 py-6 lg:py-16 max-w-screen-lg lg:mx-auto">
        <div className="border border-gray-100 shadow-lg rounded-xl p-8 items-center bg-white">
          <div className="flex flex-col text-center items-center justify-center">
            <p className="text-3xl font-base">Email Aktivasi Telah Terkirim!</p>
            <img className="h-56 py-4 my-4" src={EmailPic}></img>
            <p className="text-lg font-normal">
              Kami telah mengirim email ke alamat email kamu, Klik confirmation
              link yang tertera untuk melanjutkan proses pendaftaran akun
            </p>
            <p className="text-base my-6 font-normal">
              Setelah melakukan aktivasi, silahkan melakukan login atau klik{" "}
              <Link className="text-purple-3 underline" to="/login">
                di sini
              </Link>
            </p>
            <p className="text-base font-normal mb-1">
              Jika belum mendapatkan email,
            </p>
            <Link
              className="text-base font-normal text-purple-3 underline"
              to=""
            >
              Kirim ulang email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
