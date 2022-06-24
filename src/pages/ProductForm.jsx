import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setPreviewProductData } from '../redux/slices/previewProductSlice'
import Header from '../components/Header'
import axios from 'axios'


export default function ProductForm(props) {

    const isEditProduct = window.location.pathname === '/edit-produk'
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const inputButtonRef = useRef(null)
    const token = useSelector(state => state.auth.token)

    const [ isLoading, setLoading ] = useState(false);
    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ previewURIs, setPreviewURIs ] = useState([]);
    const [ files, setFiles ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ errorSize, setErrorSize ] = useState("");
    const [ errorName, setErrorName ] = useState("");
    const [ errorPrice, setErrorPrice ] = useState("");
    const [ errorCategory, setErrorCategory ] = useState("");
    const [ errorDesc, setErrorDesc ] = useState("");
    const [ errorPhoto, setErrorPhoto ] = useState("");

    //handle file photo
    const handleSelectFile = async (e) => {
        if (!(e.target.files?.length>0)) return; 
        const iFiles = Array.from(e.target.files);

        // validasi ukuran files
        const isAnyOversize = !!iFiles.find(file => file.size>2e+6)
        if (isAnyOversize) {
            setErrorSize("Ukuran foto maksimal 2 MB")
        }
        setPreviewURIs([...previewURIs, ...iFiles.map(file => URL.createObjectURL(file))].slice(0,4))
        setFiles([...files,...iFiles].slice(0,4))
    }
  
    // handle untuk button terbitkan
    const handlePublish = async (event) => {
        event.preventDefault();
        if(!validateInput()) return
        const data = new FormData();
        data.append("file", files);
        data.append("name", name);
        data.append("price", price);
        data.append("category", category);
        data.append("description", description);
    
        try {
            setLoading(true); 
            // const response = await axios({
            //     url: 'https://secondhand-backend-kita.herokuapp.com/products/', 
            //     method: 'POST',
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     },
            //     data:  data,
            // });
            await new Promise(r => setTimeout(r, 3000))
            toast.success('Produk berhasil ditambahkan!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            navigate('/produkku')
            
        } catch (e) {
            if(e.response) setErrorMsg(e.response.message);
            else setErrorMsg("Terjadi Kesalahan. Silakan periksa koneksi Anda")
        } finally {
            setLoading(false);
        }
    }
    
    //handle untuk preview
    const handlePreview = () => {
        if(!validateInput()) return
        dispatch(setPreviewProductData({name, price, category, description, files, previewURIs}))
        navigate('/preview-produk')
    } 

    const handleDelete = async () => {
        try {
            setLoading(true); 
            // await axios({
            //     url: 'https://secondhand-backend-kita.herokuapp.com/products/delete/:id', 
            //     method: 'DELETE',
            //     headers: {
            //         Authorization: `Bearer ${token}`
        
            //     }
            // })
            await new Promise(r => setTimeout(r, 3000))
            toast.error('Produk berhasil dihapus!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            navigate(-1,{replace: true})
        } catch (e) {
            if(e.response) setErrorMsg(e.response.message);
            else setErrorMsg("Terjadi Kesalahan. Silakan periksa koneksi Anda")
        }
    }

    const validateInput = () => {
        if(!name){
            setErrorName('nama harus diisi')
        }else{
            setErrorName('')
        }        
        if(!price){
            setErrorPrice('harga harus diisi')
        }else{
            setErrorPrice('')
        }
        if(!category){
            setErrorCategory('harus memilih kategory')
        }else{
            setErrorCategory('')
        }
        if(!description){
            setErrorDesc('deskripsi harus diisi')
        }else{
            setErrorDesc('')
        }
        if(!files){
            setErrorPhoto('foto harus diisi')
        }else{
            setErrorPhoto('')
        }

        return (!errorName || !errorPrice || !errorCategory || !errorDesc || !errorPhoto )
    }
    

    return (
        <section className='h-full'>
            <Header title="Lengkapi Info Produk" />
            

            <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
                <div className="w-full px-4 items-center my-8">
                    <div className="lg:px-72 md:mx-12">

                        {/* alert error message */}
                        <div className={ `flex items-center bg-red-600 text-white px-4 py-2 my-3 rounded relative ${errorMsg? "block":"hidden"}`}>
                            <FiAlertCircle className='text-base mr-2'/>
                            <p>{errorMsg}</p>
                        </div>
                        
                        <form onSubmit={ handlePublish }>
                            <p className="mb-3 text-sm">
                                    <button onClick={() => navigate(-1)}>
                                        <FiArrowLeft className='invisible lg:visible mx-[-64px] mb-[-8px] text-2xl' />
                                    </button>
                            Nama Produk</p>

                                <div className="mb-5">
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" className="form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                        id="nameInput" placeholder="Nama Produk" 
                                    />

                                    {/* error preview name */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${errorName? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{errorName}</p>
                                    </div>

                                </div>

                            <p className="mb-3 text-sm">Harga Produk</p>
                                <div className="mb-5">
                                    <input
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="text" className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                        id="priceInput" placeholder="Rp 0,00" 
                                    />

                                    {/* error preview price */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${errorPrice? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{errorPrice}</p>
                                    </div>

                                </div>

                            <p className="mb-3 text-sm">
                            Kategori</p>
                                <div className="mb-5">
                                    <select
                                        onChange={(e) => setCategory(e.target.value)}
                                        className='form-select w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2 rounded-[16px] transition ease-in-out focus:text-gray-700 focus:outline-none'>
                                            <option selected>Pilih kategori</option>
                                            <option value="hobi">Hobi</option>
                                            <option value="kendaraan">Kendaraan</option>
                                            <option value="baju">Baju</option>
                                            <option value="elektronik">Elektronik</option>
                                            <option value="kesehatan">Kesehatan</option>
                                    </select>

                                    {/* error preview category */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${errorCategory? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{errorCategory}</p>
                                    </div>  

                                </div>

                            <p className="mb-3 text-sm">
                            Deskripsi</p>
                                <div className="mb-5">
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text" className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                                        id="descInput" rows="3" placeholder="Contoh: Jalan Ikan Hiu No 33" 
                                    />

                                    {/* error preview description */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${errorDesc? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{errorDesc}</p>
                                    </div>  

                                </div>

                            <p className="mb-3 text-sm">
                            Foto Produk</p>
                                <div className='grid grid-cols-3 md:grid-cols-4 mb-5 gap-4'>
                                    {
                                        previewURIs.map(uri => (
                                            <img src={uri} className="w-full aspect-square rounded-[16px] object-cover mb-4" alt="foto produk" />
                                        ))

                                    }
                                        <div onClick={() => inputButtonRef.current?.click()} className={`text-2xl text-neutral-3 p-9 bg-white w-full aspect-square border border-dashed border-neutral-2 rounded-2xl ${previewURIs.length >= 4 ? "hidden" : "flex"} justify-center items-center`}>
                                            <FiPlus className="text-xl" />
                                            <input id="file-upload" type="file" ref={inputButtonRef} 
                                                className="w-full h-full invisible absolute" onChange={handleSelectFile} disabled={isLoading} accept="images/*"
                                            />
                                        </div>
                                </div>

                                {/* alert size gambar */}
                                <div className={`flex items-center text-red-600 text-sm mt-2 ${errorSize? "block":"hidden"}`}>
                                    <FiAlertCircle className='mr-2'/>
                                    <p>{errorSize}</p>
                                </div>
                                {/* error preview photo */}
                                <div className={`flex items-center text-red-600 text-sm mt-2 ${errorPhoto? "block":"hidden"}`}>
                                    <FiAlertCircle className='mr-2'/>
                                    <p>{errorPhoto}</p>
                                </div>                                
                                
                            {/* buttons */}
                            <div className="flex gap-4 w-full text-center pt-2">
                                <button 
                                    disabled={ isLoading } onClick={ handleDelete }
                                    className={`${isEditProduct ? 'flex-grow' : 'hidden'} bg-red-600 hover:bg-red-500 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out`}
                                    type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Delete
                                </button>
                                <button 
                                    disabled={ isLoading } onClick={ handlePreview }
                                    className="flex-grow bg-white border border-purple-4 py-3 text-black font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out"
                                    type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                    Preview
                                </button>
                                <button 
                                    disabled={ isLoading } 
                                    className="flex-grow bg-purple-4 hover:bg-purple-3 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out"
                                    type="submit" data-mdb-ripple="true" data-mdb-ripple-color="dark">
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
