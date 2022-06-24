import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <nav
      className="sticky top-0  w-full flex flex-wrap items-center justify-between py-4 bg-white text-black
    shadow-none lg:shadow-md navbar navbar-expand-lg navbar-light px-5 z-40"
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between lg:justify-around">
        <div className="hidden lg:inline w-[5.88rem] h-8 bg-purple-5"></div>
        <button className="w-8 lg:hidden" onClick={() => navigate(-1)}>
          <FiArrowLeft className="inline mx-4 text-2xl" />
        </button>
        <span className="text-base">{props.title}</span>
        <div className="lg:w-[5.88rem] w-8"></div>
      </div>
    </nav>
  );
}
