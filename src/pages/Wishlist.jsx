import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";


import emptyImage from "../assets/undraw_selection.svg";
import Header from "../components/Header";
import configs from "../utils/configs";
import { formatRupiah } from "../utils/helpers";

export default function Wishlist() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const name = useSelector((state) => state.auth.name);
  const profilePic = useSelector((state) => state.auth.profilePhoto);
  const city = useSelector((state) => state.auth.city);

  return (
    <div className="w-screen min-h-screen">
      <Header title="Wishlist Saya" />

      <div className="flex flex-col w-full px-4 py-8 lg:max-w-screen-lg lg:mx-auto">
        <h1 className="hidden lg:block font-bold text-xl mb-4">
          Wishlist Saya
        </h1>

        {/* Profil */}

        <div className="shadow-low w-full flex rounded-lg p-4 items-center mb-4">
          <img
            src={profilePic}
            alt="Penjual"
            className="w-12 h-12 object-cover flex-none"
          />
          <div className="flex-grow flex flex-col justify-center px-4">
            <p className="font-medium text-neutral-5">{name}</p>
            <p className="text-xs text-neutral-3">{city}</p>
          </div>
          <div className="flex-none flex items-center">
            <Link
              to="/profil"
              className="border border-purple-4 rounded-xl px-4 py-1 font-medium text-neutral-5 focus:ring-2 focus:outline-none focus:ring-purple-4 hover:bg-gray-100"
            >
              Edit
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...new Array(12)].map((_, i) => (
            <Link
              to={{ pathname: "/detail-produk" }}
              className="flex flex-col w-full h-full items-start bg-neutral-1 shadow-low rounded-md py-3 px-2 gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-2"
            >
              <img
                className="w-full aspect-[7/5] object-cover"
                alt="Foto Produk"
              />
              <p className="text-neutral-5">Buku</p>
              <p className="text-xs text-neutral-3">kendaraan</p>
              <p className="text-neutral-5">{formatRupiah(50000)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
