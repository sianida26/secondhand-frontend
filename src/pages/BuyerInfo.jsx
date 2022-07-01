import React, { useState } from 'react'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom'
import { FiArrowLeft, FiX, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from "react-icons/fa";
import { formatRupiah } from '../utils/helpers'
import buyer from '../assets/buyer-pic.png'
import product from '../assets/product.png'

import LoadingSpin from '../components/LoadingSpin'

export default function BuyerInfo(props) {

  const navigate = useNavigate()
  const isAcceptProduct = window.location.pathname === '/accept-produk'

  const [ isLoading, setLoading ] = useState(false);
  
  const [ isModalAcceptShow, setModalAcceptShow ] = useState(false);
  const [ isModalDeniedShow, setModalDeniedShow ] = useState(false);
  const [ isModalStatusShow, setModalStatusShow ] = useState(false);
  const isModalShow = isModalAcceptShow || isModalStatusShow || isModalDeniedShow;

  const handleCloseModal=() => {
    setModalAcceptShow(false)
    setModalStatusShow(false)
    setModalDeniedShow(false)
  }
  const handleOpenAcceptModal= async (event) => {
    event.preventDefault();
    setModalAcceptShow(true);
    try {
            setLoading(true); 
            // const response = await axios({
            // url: 'https://secondhand-backend-kita.herokuapp.com/products/', 
            //     method: 'GET',
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     },
            //     data:  {},
            // });
    } catch (error) {
        
    } finally{
        setLoading(false)
    }
  }
  const handleOpenDeniedModal=() => {
    setModalDeniedShow(true)
  }
  const handleOpenStatusModal=() => {
    setModalStatusShow(true)
  }

  return (
    <section className='h-full'>
    <Header title="Info Penawar" withoutSearchBar useBackButton />

    <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
        <div className="w-full px-4 items-center my-8">
            <div className="lg:px-72 md:mx-12">

                <button onClick={() => navigate(-1)}>
                    <FiArrowLeft className='invisible lg:visible mx-[-64px] mb-[-22px] text-2xl' />
                </button>
            
                <div className="flex flex-row items-center bg-white rounded-[12px] border shadow-md">
                    <div className="w-[48px] h-[48px] rounded-[12px] border border-neutral-2 m-4">
                        <img src={buyer} />
                    </div>
                    <div className="flex flex-col justify-between leading-normal">
                        <p className="mb-1 text-black text-sm font-normal">Nama Pembeli</p>
                        <p className="font-normal text-[10px] text-neutral-3 ">Kota</p>
                    </div>
                </div>

                <p className='py-4 my-2 font-normal text-sm'>Daftar Produkmu yang Ditawar</p>

                <div className="grid grid-cols-1 divide-y">
                    <div>
                        <div className="flex gap-4 py-3">
                            <img className="w-12 h-12 object-cover rounded-lg flex-none" alt="Foto Produk" src={ product } />
                            
                            <div className="flex-grow flex flex-col">
                                <p className="text-[10px] text-neutral-3 mb-1">Penjualan Produk</p>
                                <p className='mb-1'>Jam Tangan Casio</p>
                                <p className='mb-1'><s>{ formatRupiah(20000) }</s></p>
                                <p>Terjual { formatRupiah(10000) }</p>
                            </div>

                            <span className="flex-none text-[10px] text-neutral-3">20 Apr, 14:04</span>
                        </div>

                            {/* Buttons */}
                            <div className={`${isAcceptProduct? 'hidden' : 'grid'} grid-cols-2 lg:float-right text-center pt-4 pb-4`}>
                                <button className="mr-2 px-[48px] py-2 inline-block bg-white border border-purple-4 hover:bg-gray-200 font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 disabled:opacity-70"
                                    type="button" onClick={handleOpenDeniedModal}>
                                    Tolak
                                </button>
                                <button disabled={isLoading}
                                    className="ml-2 px-[48px] py-2 inline-block bg-purple-4 hover:bg-purple-5  text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-5 disabled:opacity-70"
                                    type="button" onClick={handleOpenAcceptModal} >
                                    Terima
                                    { isLoading && <LoadingSpin /> }
                                </button>
                            </div>
                            <div className={`${isAcceptProduct? 'grid' : 'hidden'} grid grid-cols-2 lg:float-right text-center pt-4 pb-4`}>
                                <button className="flex items-center justify-center mr-2 px-8 py-2 bg-white border border-purple-4 hover:bg-gray-200 font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-purple-4 disabled:opacity-70"
                                    type="button" onClick={handleOpenStatusModal}>
                                    Status
                                </button>
                                <button className="flex items-center justify-center ml-2 px-8 py-2 bg-purple-4 hover:bg-purple-5  text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-purple-5 disabled:opacity-70"
                                    type="button" >
                                    <p>Hubungi di</p>
                                    <FaWhatsapp className='ml-2 text-sm' />
                                </button>
                            </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div> 
    </div>

    {/* Backdrop for Modal */}
    <div onClick={handleCloseModal} className={`w-screen h-screen fixed ${isModalShow?'flex':'hidden'} items-center justify-center bg-black bg-opacity-70 top-0 left-0 z-50`}>

        {/* Modal for Terima */}
        <div onClick={(e)=>e.stopPropagation()} className={`${isModalAcceptShow?'bg-white':'hidden'} absolute bottom-0 lg:relative p-6 w-full lg:max-w-sm md:h-auto rounded-t-2xl lg:rounded-2xl`}>
            <button className='float-right'>
                <FiX onClick={handleCloseModal} className='text-xl mb-2' />
            </button>
            <p className='text-sm font-medium pb-2 pt-8'>
                Yeay kamu berhasil mendapat harga yang sesuai
            </p>
            <p className='text-sm text-neutral-3 font-normal py-2'>
                Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
            </p>
            <div className='bg-[#EEEEEE] p-4 rounded-2xl my-2'>
                <p className='text-center font-medium text-sm pb-3'>
                    Product Match
                </p>
                <div className="flex flex-row items-center">
                    <img className="w-[48px] h-[48px] rounded-[12px] border border-neutral-2" alt="buyer" src={buyer} />
                    <div className="flex flex-col justify-between ml-4">
                        <p className="mb-1 font-medium text-sm">Nama Pembeli</p>
                        <p className="font-normal text-[10px] text-neutral-3 ">Kota</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4">
                    <img className="w-[48px] h-[48px] rounded-[12px] border border-neutral-2" alt="produk" src={product} />
                    <div className="flex flex-col justify-between ml-4 text-sm">
                        <p className='mb-1'>Jam Tangan Casio</p>
                        <p className='mb-1'><s>{ formatRupiah(20000) }</s></p>
                        <p>Ditawar { formatRupiah(10000) }</p>
                    </div>
                </div>
            </div>
            <button className="flex items-center justify-center w-full py-3 mt-6 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-[16px] 
                    focus:shadow-lg focus:outline-none active:shadow-lg" type="button"  >
                <p>Hubungi via Whatsapp</p>
                <FaWhatsapp className='ml-2 text-sm' />
            </button>
        </div>

        {/* Modal for Tolak */}
        <div onClick={(e)=>e.stopPropagation()} className={`${isModalDeniedShow?'bg-white':'hidden'} relative p-6 w-full mx-4 max-w-sm md:h-auto rounded-2xl`}>
            <div className='flex justify-center items-center'>
            <FiAlertCircle className='text-red-600 text-6xl' />
            </div>
            <p className='text-center text-sm font-medium pb-2 my-4'>
                Apakah anda yakin ingin menolak tawaran ini?
            </p>
            <div className='grid grid-cols-2'>
            <button onClick={handleCloseModal} className="flex items-center justify-center  py-2 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-2xl
                        focus:shadow-lg focus:outline-none active:shadow-lg mr-2" type="button"  >
                    Cancel
                </button>
                <button className="flex items-center justify-center  py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-normal text-sm rounded-2xl 
                        focus:shadow-lg focus:outline-none active:shadow-lg" type="button"  >
                    Tolak
                </button>
            </div>
        </div>

        {/* Modal for Status */}
        <div onClick={(e)=>e.stopPropagation()} className={`${isModalStatusShow?'bg-white':'hidden'} absolute bottom-0 lg:relative p-6 w-full lg:max-w-sm md:h-auto rounded-t-2xl lg:rounded-2xl`}>
            <button className='float-right'>
                <FiX onClick={handleCloseModal} className='text-xl mb-2' />
            </button>
            <p className='text-sm font-medium pb-2 pt-8'>
                Perbarui status penjualan produkmu
            </p>
            <div className='pt-6'>
                <div className="flex pb-3">
                    <div className="flex items-center h-5">
                        <input checked id="radio1" name="status" type="radio" value="" className="accent-purple-4 focus:ring-[#C4C4C4] focus:ring-2" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label for="radio1" className="font-medium text-sm">
                            Berhasil Terjual
                        </label>
                        <p id="radio1" className="text-sm font-normal text-neutral-3 my-2">
                            Kamu telah sepakat menjual produk ini kepada pembeli
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center h-5">
                        <input id="radio2" name="status" type="radio" value="" className="accent-purple-4 focus:ring-[#C4C4C4] focus:ring-2" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label for="radio2" className="font-medium text-sm">
                            Batalkan Transaksi
                        </label>
                        <p id="radio2" className="text-sm font-normal text-neutral-3 my-2">
                            Kamu membatalkan transaksi produk ini dengan pembeli
                        </p>
                    </div>
                </div> 
            </div>
            <button className="flex items-center justify-center w-full py-3 mt-6 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-[16px] 
                    focus:shadow-lg focus:outline-none active:shadow-lg" type="button"  >
                Kirim
            </button>
        </div>

    </div>
</section>

  )
}
