import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiBell,
  FiList,
  FiLogIn,
  FiMenu,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { formatRupiah } from "../utils/helpers";
import product from "../assets/product.png";

import Sidebar from "./Sidebar";

export default function Header(props) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.token);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  return (
    <nav
      className="sticky top-0  w-full flex flex-wrap items-center justify-between py-4 bg-white text-black
    shadow-none lg:shadow-md navbar navbar-expand-lg navbar-light px-5 z-40"
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between lg:justify-around lg:max-w-screen-lg lg:mx-auto">
        <div className="hidden lg:flex gap-5 items-center lg:flex-grow-0">
          <div className="w-[5.88rem] h-8 bg-purple-5"></div>
          {!props.withoutSearchBar && (
            <div className="h-12 bg-white rounded-2xl py-3 px-6 text-neutral-3 flex lg:bg-[#EEEEEE]">
              <input
                className="w-full h-full bg-transparent"
                placeholder="Cari di sini ..."
              />
              <FiSearch className="text-2xl" />
            </div>
          )}
        </div>
        {props.useBackButton ? (
          <button className="w-8 lg:hidden" onClick={() => navigate(-1)}>
            <FiArrowLeft className="inline mx-4 text-2xl" />
          </button>
        ) : (
          <button
            className="w-8 lg:hidden"
            onClick={() => setShowSidebar(true)}
          >
            <FiMenu className="inline mx-4 text-2xl" />
          </button>
        )}
        <div
          className={`lg:flex-grow lg:h-12 ${
            props.withoutSearchBar
              ? "lg:flex lg:justify-center lg:items-center"
              : "lg:invisible"
          }`}
        >
          <span className={`text-lg font-bold text-center lg:font-normal`}>
            {props.title}
          </span>
        </div>
        <div className="w-8 lg:w-auto lg:flex-grow-0">
          {isLoggedIn ? (
            <div className="lg:flex gap-4 items-center text-2xl hidden">
              <Link to="/daftar-jual">
                <FiList />
              </Link>
              <div className="relative">
               <button className="mt-2 hover:text-purple-4"> <FiBell onClick={() => setShowNotification(prev => !prev)} /> </button>

                {/* Notifikasi */}

                <div className={`hidden ${showNotification && "lg:block"} absolute bg-white shadow-lg border border-gray-100 w-96 mt-2 right-0 p-4 rounded-2xl text-sm`}>
                  <div className="grid grid-cols-1 divide-y">
                    <div className="flex gap-4 py-3">
                      <img
                        className="w-12 h-12 object-cover rounded-lg flex-none"
                        alt="Foto Produk"
                        src={product}
                      />

                      <div className="flex-grow flex flex-col">
                        <p className="text-[10px] text-neutral-3 mb-1">
                          Penjualan
                        </p>
                        <p className="mb-1">Jam Tangan Casio</p>
                        <p className="mb-1">
                          <s>{formatRupiah(20000)}</s>
                        </p>
                        <p>Ditawar {formatRupiah(10000)}</p>
                      </div>

                      <span className="flex-none text-[10px] text-neutral-3 pr-0">
                        20 Apr, 14:04
                      </span>
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/akun-saya">
                <FiUser />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="hidden lg:inline-block">
              <button className="btn shadow-none">
                <FiLogIn />
                Masuk
              </button>
            </Link>
          )}
        </div>
      </div>
      <Sidebar show={showSidebar} close={() => setShowSidebar(false)} />
    </nav>
  );
}
