import React, { useEffect, useRef, useState } from "react";
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
  FiHeart
} from "react-icons/fi";
import { formatRupiah } from "../utils/helpers";
import moment from "moment"
import PerfectScrollbar from 'react-perfect-scrollbar'

import Sidebar from "./Sidebar";
import BlankIllustration from '../assets/undraw_selection.svg'

export default function Header(props) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.token);
  const notifications = useSelector(state => state.notification.items);

  const notificationRef = useRef();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleClickOutsideNotification = e => {
      if (!notificationRef.current.contains(e.target)) setShowNotification(false);
    }

    document.addEventListener("mousedown", handleClickOutsideNotification)
    return () => document.removeEventListener("mousedown", handleClickOutsideNotification)
  })

  const handleClickNotification = (notificationData) => {
    const previewData = {
      name: notificationData.productName,
      category: notificationData.category,
      price: notificationData.price,
      description: notificationData.description,
      files: notificationData.image.map(x => ({ file:null, uri: x })),
      productId: notificationData.productId,
    }

    if (notificationData.type === "Berhasil diterbitkan") return navigate('/preview-produk', { state: { previewData, readOnly: true } })
    if (notificationData.type === "Anda menawar produk") return navigate(`/produk/${ notificationData.productId }`)
    return navigate(`/penawaran/${notificationData.bidId}`);
  }

  return (
    <nav
      className={`sticky top-0 w-full ${ props.hiddenOnSm ? "hidden lg:flex" : "flex" } flex-wrap items-center justify-between py-4 ${props.home ? "bg-[#FFE9C9] lg:bg-white" : "bg-white"} text-black
    shadow-none lg:shadow-md navbar navbar-expand-lg navbar-light px-5 z-40`}
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between lg:justify-around lg:max-w-screen-lg lg:mx-auto">
        <div className="hidden lg:flex gap-5 items-center lg:flex-grow-0">
          <Link to="/">
            <div className="w-[5.88rem] h-8 bg-purple-5"></div>
          </Link>
          {!props.withoutSearchBar && (
            <div className="h-12 bg-white rounded-2xl py-3 px-6 text-neutral-3 flex lg:bg-[#EEEEEE]">
              <input
                className="w-full h-full bg-transparent"
                placeholder="Cari di sini ..."
                onChange={props.onSearchChange}
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
          className={`lg:flex-grow lg:h-12 ${props.withoutSearchBar
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
              <Link to="/produkku">
                <FiList />
              </Link>
              <div className="relative">
                <button className="mt-2 hover:text-purple-4"> <FiBell onClick={() => setShowNotification(prev => !prev)} /> </button>

                {/* Notifikasi */}

                <div ref={notificationRef} className={`hidden ${showNotification && "lg:block"} absolute bg-white shadow-lg border border-gray-100 w-96 mt-2 right-0 p-4 rounded-2xl text-sm max-h-96 overflow-y-auto`}>
                  <PerfectScrollbar>
                  <div className="grid grid-cols-1 divide-y">
                    {
                      notifications.length === 0 ? <div className="w-full h-full flex flex-col justify-center items-center px-4">
                        <img className="w-1/2 object-cover" src={BlankIllustration} alt="Illustration" />
                        <p className="text-center mt-2">Notifikasi kamu kosong nih!</p>
                      </div>
                      : notifications.map(notification => (
                        <div className="flex flex-col bg-white py-4" key={notification.id} onClick={() => handleClickNotification(notification)}>
                          <div className="flex gap-4">
                            <img
                              src={notification.image[0]}
                              alt={notification.productName}
                              className="w-12 h-12 rounded-xl border border-neutral-2 mr-4 flex-none object-cover"
                            />
                            <div className="flex flex-col w-full gap-1">
                              <div className="flex justify-between text-[10px] text-neutral-3">
                                <p>{notification.type}</p>
                                <div className="flex gap-2 items-center">
                                  <p>{moment(notification.time).format('D MMM, HH:mm')}</p>
                                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                </div>
                              </div>
                              <div className="text-sm">
                                <p>{notification.productName}</p>
                                <p className={notification.type === "Berhasil terjual" && "line-through"}>{formatRupiah(notification.price)}</p>
                                <p className={notification.type === "Penawaran ditolak" && "line-through"}>{notification.bidPrice && `${notification.type === "Berhasil terjual" ? "Terjual" : "Ditawar"} ${formatRupiah(notification.bidPrice)}`}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  </PerfectScrollbar>
                </div>
              </div>

              <Link to="/wishlist">
                <FiHeart />
              </Link>
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
