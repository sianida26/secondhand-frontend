import React from 'react'

import { FiBox, FiDollarSign, FiHeart, FiPlus } from 'react-icons/fi'

import buyerPic from '../assets/buyer-pic.png';
import watchPic from '../assets/jam.png';
import Header from '../components/Header';

export default function DaftarJualSaya() {
  return (
    <div className="w-screen min-h-screen">
      <Header title="Daftar Jual Saya" withoutSearchBar />

      <div className="flex flex-col w-full px-4 py-8">

        {/* Penjual */}
        <div className="shadow-low w-full flex rounded-lg p-4 items-center">
          <img src={ buyerPic } alt="Penjual" className="w-12 h-12 object-cover flex-none" />
          <div className="flex-grow flex flex-col justify-center px-4">
            <p className="font-medium text-neutral-5">Nama Penjual</p>
            <p className="text-xs text-neutral-3">Kota</p>
          </div>
          <div className="flex-none flex items-center">
            <button className="border border-purple-4 rounded-xl px-4 py-1 font-medium text-neutral-5 focus:ring-2 focus:outline-none focus:ring-purple-4">Edit</button>
          </div>
        </div>

        {/* Categories */}
        <div className="w-full overflow-x-auto flex gap-2 mt-2 py-2 pl-2">
          <button className="btn focus:ring-2 focus:ring-offset-2 focus:ring-purple-4"><FiBox /> Produk</button>
          <button className="btn bg-purple-1 text-neutral-4 focus:ring-2 focus:ring-offset-2 focus:ring-purple-2 focus:bg-purple-2"><FiHeart /> Diminati</button>
          <button className="btn bg-purple-1 text-neutral-4 focus:ring-2 focus:ring-offset-2 focus:ring-purple-2 focus:bg-purple-2"><FiDollarSign /> Terjual</button>
        </div>

        {/* Fragment Container */}
        <div className="w-full mt-4">

          { renderTerjualFragment() }
        </div>
      </div>
    </div>
  )
}

const renderTerjualFragment = () => {

  return (
    <div className="flex flex-col divide-y px-4 divide-[#E5E5E5]">
      <div className="flex gap-4 py-3">
        <img className="w-12 h-12 object-cover rounded-lg flex-none" alt="Foto Produk" src={ watchPic } />
        
        <div className="flex-grow flex flex-col">
          <p className="text-xs text-neutral-3">Penjualan Produk</p>
          <p>Jam Tangan Casio</p>
          <p><s>Rp 250.000</s></p>
          <p>Terjual Rp 200.000</p>
        </div>

        <span className="flex-none text-xs text-neutral-3">20 Apr, 14:04</span>
      </div>
      <div className="flex gap-4 py-3">
        <img className="w-12 h-12 object-cover rounded-lg flex-none" alt="Foto Produk" src={ watchPic } />
        
        <div className="flex-grow flex flex-col">
          <p className="text-xs text-neutral-3">Penjualan Produk</p>
          <p>Jam Tangan Casio</p>
          <p><s>Rp 250.000</s></p>
          <p>Terjual Rp 200.000</p>
        </div>

        <span className="flex-none text-xs text-neutral-3">20 Apr, 14:04</span>
      </div>
    </div>
  )
}

const renderDiminatiFragment = () => {

  return (
    <div className="flex flex-col divide-y px-4 divide-[#E5E5E5]">
      <div className="flex gap-4 py-3">
        <img className="w-12 h-12 object-cover rounded-lg flex-none" alt="Foto Produk" src={ watchPic } />
        
        <div className="flex-grow flex flex-col">
          <p className="text-xs text-neutral-3">Penawaran Produk</p>
          <p>Jam Tangan Casio</p>
          <p>Rp 250.000</p>
          <p>Ditawar Rp 200.000</p>
        </div>

        <span className="flex-none text-xs text-neutral-3">20 Apr, 14:04</span>
      </div>
      <div className="flex gap-4 py-3">
        <img className="w-12 h-12 object-cover rounded-lg flex-none" alt="Foto Produk" src={ watchPic } />
        
        <div className="flex-grow flex flex-col">
          <p className="text-xs text-neutral-3">Penawaran Produk</p>
          <p>Jam Tangan Casio</p>
          <p>Rp 250.000</p>
          <p>Ditawar Rp 200.000</p>
        </div>

        <span className="flex-none text-xs text-neutral-3">20 Apr, 14:04</span>
      </div>
    </div>
  )
}

const renderProductFragment = () => {

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Add Product */}
      <div className="flex flex-col justify-center items-center w-full h-full border border-neutral-2 border-dashed text-neutral-3">
        <FiPlus />
        <p>Tambah Produk</p>
      </div>

      {/* Contoh Produk */}
      <div className="flex flex-col w-full h-full bg-neutral-1 shadow-low rounded-md py-3 px-2 gap-2">
        <img className="w-full aspect-[7/5] object-cover" alt="Foto Produk" src={ watchPic } />
        <p className="text-neutral-5">Jam Tangan Casio</p>
        <p className="text-xs text-neutral-3">Aksesoris</p>
        <p className="text-neutral-5">Rp250.000</p>
      </div>
    </div>
  )
}