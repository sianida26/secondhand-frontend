import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom'
import {FiPlus, FiArrowLeft, FiAlertCircle} from 'react-icons/fi'
import axios from 'axios'


export default function ProductForm(props) {
    const navigate = useNavigate()

    const inputButtonRef = useRef(null)

    const [ isLoading, setLoading ] = useState(false);
    const [ previewURIs, setPreviewURIs ] = useState([]);
    const [ files, setFiles ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState("");

  
    const handleSelectFile = async (e) => {
      if (!(e.target.files?.length>0)) return; 
      const iFiles = Array.from(e.target.files);

      // validasi ukuran files
    const isAnyOversize = !!iFiles.find(file => file.size>2e+6)
    if (isAnyOversize) {
        // handle oversize
    }
    setPreviewURIs([...previewURIs, ...iFiles.map(file => URL.createObjectURL(file))].slice(0,4))
    setFiles([...files,...iFiles].slice(0,4))
  
    //   const data = new FormData();
    //   data.append("file", files);
  
    //   try {
    //     setLoading(true); 
    //     const response = await axios({
    //       method: 'POST',
    //       url: 'http:', 
    //       data:  data,
    //     });
    //     navigate('/')
        
    //   } catch (e) {
    //     if(e.response) setErrorMsg(e.response.message);
    //     else setErrorMsg("Terjadi Kesalahan. Silakan periksa koneksi anda")
    //   } finally {
    //     setLoading(false);
    //   }
    } 

    return (
        <section className='h-full'>
            <Header title="Lengkapi Info Produk" />

            <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
                <div className="w-full px-4 items-center my-8">
                    <div className="lg:px-72 md:mx-12">
                        <div className={ `flex items-center bg-red-600 text-white px-4 py-2 mt-3 rounded relative ${errorMsg? "block":"hidden"}`}>
                            <FiAlertCircle className='text-base mr-2'/>
                            <p>{errorMsg}</p>
                        </div>
                        <form>
                            <p className="mb-3 text-sm">
                                    <button onClick={() => navigate(-1)}>
                                        <FiArrowLeft className='invisible lg:visible mx-[-64px] mb-[-8px] text-2xl' />
                                    </button>
                            Nama Produk</p>
                                <div className="mb-5">
                                    <input
                                        type="text" className="form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                        id="nameInput" placeholder="Nama Produk" 
                                    />
                                </div>
                            <p className="mb-3 text-sm">Harga Produk</p>
                                <div className="mb-5">
                                    <input
                                        type="text" className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                        id="priceInput" placeholder="Rp 0,00" 
                                    />
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
                                        id="descInput" rows="3" placeholder="Contoh: Jalan Ikan Hiu No 33" 
                                    />
                                </div>
                            <p className="mb-3 text-sm">Foto Produk</p>
                                <div className='grid grid-cols-2 lg:grid-cols-4 mb-5'>
                                    {
                                        previewURIs.map(uri => (
                                            <img src={uri} className="w-[96px] h-[96px] rounded-[16px] object-cover" alt="foto produk" />
                                        ))

                                    }
                                    {previewURIs.length<4 && <div className={`w-[96px] h-[96px] rounded-[16px] border-dashed border-2 border-neutral-2 ${ !previewURIs && "bg-white" } flex justify-center items-center`}>
                                            <div onClick={ () => inputButtonRef.current?.click() } className="w-full h-full flex flex-col justify-center items-center" >
                                                {/* <div className="flex flex-col justify-center w-full items-center"> */}
                                                    <FiPlus className='ms-auto text-neutral-3 text-lg' />
                                                {/* </div> */}
                                            </div>
                                        <input ref={ inputButtonRef } disabled={ isLoading } type="file" accept="images/*" className="h-full w-full opacity-0" id="prodInput" onChange={ handleSelectFile } />
                                    </div>}
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
