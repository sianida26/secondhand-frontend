import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FiArrowLeft, FiSearch, FiBell, FiList, FiUser } from "react-icons/fi";

import gambarJam from "../assets/jam.png";
import gambarOrang from "../assets/buyer-pic.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function buyer13() {
  //   const [isLoading, setLoading] = useState(true);
  return (
    <div className="w-screen min-h-screen">
      {/* Header */}
      <div className="w-full pt-8 px-4 gap-4 md:bg-white md:shadow-high md:justify-between md:py-4 md:px-16 hidden md:flex items-center">
        <div className="flex-grow md:flex-grow-0 md:flex md:justify-center md:items-center md:gap-4">
          <div className="hidden md:inline w-[5.88rem] h-8 bg-purple-5"></div>
          <div className="h-12 bg-white rounded-2xl py-3 px-6 text-neutral-3 flex md:bg-[#EEEEEE]">
            <input className="w-full h-full bg-transparent" placeholder="Cari di sini ..." />
            <FiSearch className="text-2xl" />
          </div>
        </div>

        <div className="flex gap-4 items-center text-2xl">
          <FiList />
          <FiBell />
          <FiUser />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:max-w-screen-lg md:mx-auto md:mt-12">
        <div className="w-full aspect-[6/5] relative md:w-3/5 md:flex-shrink-0">
          <Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop={true}>
            <img className="w-full aspect-[6/5] object-cover md:rounded-xl" src={gambarJam} />
            <img className="w-full aspect-[6/5] object-cover md:rounded-xl" src={gambarJam} />
          </Carousel>
          <button className="absolute top-4 left-4 rounded-full w-8 h-8 bg-white flex justify-center items-center">
            <FiArrowLeft />
          </button>
        </div>

        <div className="px-4 flex flex-col relative bottom-2 gap-4 md:flex-grow md:bottom-0">
          <div className="bg-white rounded-xl px-6 py-4 flex flex-col shadow-low md:shadow-high">
            <h1 className="font-medium">Jam Tangan Casio</h1>
            <p className="text-sm text-neutral-3">Aksesoris</p>
            <p className="">Rp 250.000</p>

            <button className="hidden md:block w-full bg-purple-4 font-medium text-white text-center py-2 mt-4 rounded-lg">Saya Tertarik dan Ingin Nego</button>
            {/* <button className="hidden md:block w-full border border-purple-4 bg-white font-medium text-neutral-5 text-center py-2 mt-4 rounded-lg">Edit</button> */}
          </div>

          <div className="flex bg-white rounded-xl px-6 py-4 shadow-low gap-4">
            <img className="h-14 aspect-square rounded-xl object-cover" src={gambarOrang} />
            <div className="flex flex-col justify-center">
              <h1 className="font-medium">Nama Penjual</h1>
              <p className="text-sm text-neutral-3">Kota</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20 px-4 mt-2 md:max-w-screen-lg md:mt-4 md:mx-auto md:px-0 md:pb-0">
        <div className="flex bg-white rounded-xl px-6 py-4 shadow-low flex-col gap-2 md:w-3/5">
          <h1 className="font-medium">Deskripsi</h1>
          <p className="text-neutral-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at vestibulum tortor. Pellentesque tristique augue lorem, eget lacinia diam rutrum in. In pretium lacus vel dolor finibus, nec molestie sapien condimentum. Morbi
            mollis hendrerit eros quis viverra. Donec augue magna, mattis id lectus id, congue venenatis odio. Ut a consectetur eros. Phasellus convallis convallis vestibulum. Curabitur fermentum dolor quam, vitae ultricies sem facilisis
            eget. Suspendisse et blandit ex. Nullam libero orci, placerat sed posuere pretium, vestibulum quis tellus. Maecenas ut massa auctor, mollis nulla non, consectetur augue. Morbi malesuada vulputate dolor ac tempus. Cras nec nisl
            tincidunt, venenatis eros quis, tincidunt dolor. Nulla facilisi. Fusce at luctus risus.
          </p>
        </div>
      </div>

      <div className="fixed w-full bottom-4 px-4 md:hidden">
        <button className="bg-purple-4 font-medium text-white text-center py-4 w-full rounded-xl">Saya Tertarik dan Ingin Nego</button>
      </div>
    </div>
  );
}

export default buyer13;
