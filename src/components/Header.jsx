import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowLeft, FiBell, FiList, FiLogIn, FiMenu, FiSearch, FiUser } from "react-icons/fi";

import Sidebar from './Sidebar';

export default function Header(props) {

  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.token);

  const [ showSidebar, setShowSidebar ] = useState(false);

  return (
    <nav
      className="sticky top-0 w-full flex flex-wrap items-center justify-between py-4 bg-white text-black
    shadow-none lg:shadow-md navbar navbar-expand-lg navbar-light px-5 z-40"
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between lg:justify-around lg:max-w-screen-lg lg:mx-auto">
        <div className="hidden lg:flex gap-5 items-center lg:flex-grow-0">
          <div className="w-[5.88rem] h-8 bg-purple-5"></div>
          {
            !props.withoutSearchBar && (<div className="h-12 bg-white rounded-2xl py-3 px-6 text-neutral-3 flex lg:bg-[#EEEEEE]">
                <input
                  className="w-full h-full bg-transparent"
                  placeholder="Cari di sini ..."
                />
                <FiSearch className="text-2xl" />
            </div>)
          }
        </div>
        {
          props.useBackButton ? (<button className="w-8 lg:hidden" onClick={() => navigate(-1)}>
            <FiArrowLeft className="inline mx-4 text-2xl" />
          </button>)
          : (<button className="w-8 lg:hidden" onClick={ () => setShowSidebar(true) }>
            <FiMenu className="inline mx-4 text-2xl" />
          </button>)
        }
        <div className={`lg:flex-grow lg:h-12 ${ props.withoutSearchBar ? 'lg:flex lg:justify-center lg:items-center' : 'lg:invisible' }`}>
          <span className={`text-lg font-bold text-center lg:font-normal`}>{props.title}</span>
        </div>
        <div className="w-8 lg:w-auto lg:flex-grow-0">
          {
            isLoggedIn ? <div className="lg:flex gap-4 items-center text-2xl hidden">
                  <Link to="/daftar-jual"><FiList /></Link>
                  <Link to="/notifikasi"><FiBell /></Link>
                  <Link to="/akun-saya"><FiUser /></Link>
              </div>
            : (<Link to="/login" className="hidden lg:inline-block">
                <button className="btn shadow-none">
                  <FiLogIn />
                  Masuk
                </button>
              </Link>
            )
          }
        </div>
      </div>
      <Sidebar show={ showSidebar } close={ () => setShowSidebar(false) } />
    </nav>
  );
}
