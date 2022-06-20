import React from 'react'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import buyer from '../assets/buyer-pic.png'

import product from '../assets/product.png'

export default function BuyerInfo(props) {
  const navigate = useNavigate()
  return (
    <section className='h-full'>
    <Header title="Info Penawar" />

    <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
        <div className="w-full px-4 items-center my-8">
            <div className="lg:px-72 md:mx-12">

                <button onClick={() => navigate(-1)}>
                    <FiArrowLeft className='invisible lg:visible mx-[-64px] text-2xl' />
                </button>
            
                <div className="flex flex-row items-center bg-white rounded-[12px] border shadow-md mt-[-22px]">
                    <div className="w-[48px] h-[48px] rounded-[12px] border border-neutral-2 m-4">
                        <div className="flex flex-col items-center">
                            <div className='absolute'>
                                <img src={buyer} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between  leading-normal">
                        <p className="mb-1 text-black text-sm font-normal">Nama Pembeli</p>
                        <p className="font-normal text-[10px] text-neutral-3 ">Kota</p>
                    </div>
                </div>

                <p className='py-4 my-2 font-normal text-sm'>Daftar Produkmu yang Ditawar</p>

                <div class="grid grid-cols-1 divide-y">
                    <div>
                    <div className="flex flex-row bg-white">
                        <div className="w-[48px] h-[48px] rounded-[12px] border-solid border-neutral-2 mr-4">
                            <div className="flex flex-col items-center">
                                <div className='absolute'>
                                    <img src={product} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col leading-normal font-normal">
                            <div className="float-root mb-2 text-[10px] text-neutral-3 ">
                                <p className='float-left'>Penawaran Produk</p>
                                <p className='float-right'>Selasa</p></div>
                            <p className="mb-1 text-sm">Jam Tangan Casio</p>
                            <p className="mb-1 text-sm">Rp. 250.000</p>
                            <p className="mb-1 text-sm">Ditawar Rp. 200.000</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:float-right text-center pt-4 pb-4">
                                <button className="mr-2 px-[48px] py-2 inline-block bg-white border border-purple-4 hover:bg-neutral-2 text-black font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out"
                                    type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Tolak
                                </button>
                                <button className="ml-2 px-[48px] py-2 inline-block bg-purple-4 hover:bg-purple-3  text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out"
                                    type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Terima
                                </button>
                            </div>
                    </div>
                    <div></div>
                </div>

            </div>
        </div> 
    </div>
</section>

  )
}
