import React from "react";
import { FiCamera, FiLogOut, FiPlusCircle, FiSettings } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiHome, FiBell, FiPluscircle, FiList, FiUser } from "react-icons/fi";

export default function AkunSaya() {
  return (
    <section>
      <h1 className="px-4 py-10 not-italic font-bold text-2xl">Akun Saya</h1>
      <div className=" flex text-purple-4 items-center justify-center text-2xl  mx-auto h-24 bg-gray-400 w-24 rounded-xl">
        <FiCamera />
      </div>

      <div className="  text-2xl first-letter pr-4 pl-4 divide-y divide-gray-300">
        <div className="items-center flex gap-2  py-6 font-medium text-sm">
         
          <FiEdit className=" text-2xl text-purple-4 " />
           Ubah Akun
        </div>
        <div className="items-center flex gap-2 py-6 font-medium text-sm">
        <FiSettings className=" text-2xl text-purple-4 "/>Pengaturan Akun
        </div>
        
        <div className="items-center flex gap-2 py-6 font-medium text-sm ">
        <FiLogOut className="text-2xl text-purple-4" />Keluar
        </div>
        
      </div>

      <div className="py-2 text-ls text-center text-gray-400 font-normal">
        Version 1.0.0
      </div>

      <div className=" fixed bottom-0 w-full grid grid-cols-5 ">

        <div className="flex justify-center items-center flex-col text-xs"><FiHome className="text-xl"/>Home </div>
        <div className="flex justify-center items-center flex-col text-xs"><FiBell className="text-xl"/> Notifikasi</div>
        <div className="flex justify-center items-center flex-col text-xs"><FiPlusCircle className="text-xl"/>Jual</div>
        <div className="flex justify-center items-center flex-col text-xs"><FiList className="text-xl" /> Daftar Jual</div>
        <div className="flex justify-center items-center flex-col text-xs text-purple-4"><FiUser className="text-xl"/>Akun</div>

      </div>
    </section>
  );
}
