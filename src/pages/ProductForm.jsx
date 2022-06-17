import React from 'react'
import { Link } from 'react-router-dom'
import {FiPlus, FiArrowLeft} from 'react-icons/fi'


export default function ProductForm() {
  return (
    <section className='h-full'>
        <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
            <div className="w-full px-4 items-center my-8">
                <div className="lg:px-72 md:mx-12">
                    <form>
                        <p className="mb-3 text-sm">
                            <Link to="/">
                                <button>
                                    <FiArrowLeft className='invisible lg:visible mx-[-64px] mb-[-8px] text-2xl' />
                                </button>
                            </Link>
                        Nama Produk</p>
                            <div className="mb-5">
                                <input
                                    type="text" className="form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                    border border-neutral-2  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                    id="nameInput" placeholder="Nama Produk" />
                            </div>
                        <p className="mb-3 text-sm">Harga Produk</p>
                            <div className="mb-5">
                                <input
                                    type="text" className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                    border border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                    id="priceInput" placeholder="Rp 0,00" />
                            </div>
                        <p className="mb-3 text-sm">Kategori</p>
                            <div className="mb-5">
                                <select 
                                    className='form-select w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                    border border-neutral-2 rounded-[16px] transition ease-in-out focus:text-gray-700 focus:outline-none'>
                                        <option selected>Pilih kategori</option>
                                        <option value="1">Hobi</option>
                                        <option value="2">Kendaraan</option>
                                        <option value="3">Baju</option>
                                        <option value="4">Elektronik</option>
                                        <option value="4">Kesehatan</option>
                                </select>
                            </div>
                        <p className="mb-3 text-sm">Deskripsi</p>
                            <div className="mb-5">
                                <textarea
                                    type="text" className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                    border border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                    id="descInput" rows="3" placeholder="Contoh: Jalan Ikan Hiu No 33" />
                            </div>
                        <p className="mb-3 text-sm">Foto Produk</p>
                            <div className='mb-5'>
                                <div class="w-[96px] h-[96px] rounded-[16px] border-dashed border-2 border-neutral-2 bg-white flex justify-center items-center">
                                        <div class="absolute">
                                            <div class="flex flex-col items-center">
                                                <FiPlus className='text-neutral-3 text-lg' />
                                            </div>
                                        </div>
                                    <input type="file" class="h-full w-full opacity-0" id="prodInput" />
                                </div>
                            </div>

                        <div className="grid grid-cols-2 text-center pt-2">
                            <button className="mr-2 inline-block bg-white border border-purple-4 py-3 text-black font-normal text-sm leading-tight rounded-[16px] 
                                focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out"
                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Preview
                            </button>
                            <button className="ml-2 inline-block bg-purple-4 hover:bg-purple-3 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                                focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out"
                                type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Terbitkan
                            </button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    </section>
  )
}
