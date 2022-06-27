import React from "react";
import { Link } from "react-router-dom";

import { FiCamera, FiLogOut, FiPlusCircle, FiSettings } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiHome, FiBell, FiList, FiUser } from "react-icons/fi";
import Header from "../components/Header";

export default function akunSaya() {
  return (
    <section className="h-full max-w-lg lg:max-w-full mx-auto">
      <Header title="Akun Saya" />

      <div className={`flex text-purple-4 items-center justify-center text-2xl  mx-auto h-24 mt-4 w-24 rounded-xl relative group`}>
        {/* Preview gambar */}
        <img src="https://ui-avatars.com/api/?background=random&name=aa&rounded=true" className="h-full w-full object-cover rounded-xl" alt="Foto Profil" />
      </div>

      <div className="  text-2xl first-letter px-4 lg:px-16 divide-y divide-gray-300">
        <div className="items-center flex gap-2  py-6 font-medium text-sm">
          <FiEdit className=" text-2xl text-purple-4 " />
          Ubah Akun
        </div>
        <div className="items-center flex gap-2 py-6 font-medium text-sm">
          <FiSettings className=" text-2xl text-purple-4 " />
          Pengaturan Akun
        </div>

        <Link to="/logout" className="items-center flex gap-2 py-6 font-medium text-sm ">
          <FiLogOut className="text-2xl text-purple-4" />
          Keluar
        </Link>
      </div>

      <div className="py-2 text-ls text-center text-gray-400 font-normal">Version 1.0.0</div>

      {/* <div className=" fixed bottom-0 w-full grid grid-cols-5 ">
        <div className="flex justify-center items-center flex-col text-xs">
          <FiHome className="text-xl" />
          Home{" "}
        </div>
        <div className="flex justify-center items-center flex-col text-xs">
          <FiBell className="text-xl" /> Notifikasi
        </div>
        <div className="flex justify-center items-center flex-col text-xs">
          <FiPlusCircle className="text-xl" />
          Jual
        </div>
        <div className="flex justify-center items-center flex-col text-xs">
          <FiList className="text-xl" /> Daftar Jual
        </div>
        <div className="flex justify-center items-center flex-col text-xs text-purple-4">
          <FiUser className="text-xl" />
          Akun
        </div> 
      </div>*/}
    </section>
  );
}
