import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom'
import { FiPlus, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import {useSessionStorage} from 'react-use';
import axios from 'axios'

import Validator from '../utils/Validator';
import configs from '../utils/configs';
import LoadingSpin from '../components/LoadingSpin';
import Header from '../components/Header';

export default function ProductForm(props) {
    
    const isEditProduct = window.location.pathname === '/edit-produk'
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { id } = useParams()

    const inputButtonRef = useRef(null)
    const token = useSelector(state => state.auth.token)
    const productId = location.state?.product?.id

    const [ isLoading, setLoading ] = useState(false);

    const [ name, setName ] = useState("");
    const [ price, setPrice ] = useState("");
    const [ category, setCategory ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ files, setFiles ] = useState([]);
    const [ formErrors, setFormErrors ] = useState({});
    const [ errorMsg, setErrorMsg ] = useState("");
    const [ detailPictId, setDetailPictId ] = useState(0);

    const [ isModalPictShow, setModalPictShow ] = useState(false);
    const isModalShow = isModalPictShow;

    const handleOpenPictModal =(id) => {
        setDetailPictId(id)
        setModalPictShow(true)
    }
    const handleCloseModal =() => {
        setModalPictShow(false)
    }

    useEffect(() => {

        const populateInput = async () => {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setDescription(product.description);
            setFiles(product.image.map(image => ({ file: null, uri: image })));
        }

        const product = location.state?.product;
        if (location.state?.fromPreview){
            console.log(location.state)
            setName(location.state?.previewData?.name)
            setPrice(location.state?.previewData?.price)
            setCategory(location.state?.previewData?.category)
            setDescription(location.state?.previewData?.description)
            setFiles(location.state?.previewData?.files || [])
            return
        }
        if (!isEditProduct || !product) return;
        populateInput()
        
    }, [isEditProduct, location.state?.product])

    //handle file photo
    const handleSelectFile = async (e) => {
        if (!(e.target.files?.length>0)) return; 
        const iFiles = Array.from(e.target.files);

        // validasi ukuran files
        const isAnyOversize = !!iFiles.find(file => file.size>5e+6)
        if (isAnyOversize) {
            alert('Ukuran foto maksimal adalah 5 MB');
            return;
        }
        // setPreviewURIs([...previewURIs, ...iFiles.map(file => URL.createObjectURL(file))].slice(0,4))
        // setFiles([...files,...iFiles].slice(0,4))
        setFiles(prev => [...prev, ...iFiles.map(file => ({ file, uri: URL.createObjectURL(file) }))].slice(0,4))
    }
  
    // handle untuk button terbitkan
    const handlePublish = async (event) => {
        event.preventDefault();

        if(!validateInput()) return;

        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            files.filter(file => file.file !== null).forEach(file => formData.append("files",file.file || file.uri)); 
            files.filter(file => file.file === null).forEach(file => formData.append("oldFileUrls[]", file.uri))
            // formData.append('oldFileUrls', files.filter(file => file.file === null).map(file => file.uri))
            await axios({
                url: `${ configs.apiRootURL }${ productId ? '/products/'+productId : '/products' }`,
                method: productId ? 'PUT' : 'POST',
                headers: {
                    Authorization: `Bearer ${ token }`
                },
                data: formData,
                timeout: 20000,
            })
            toast.success('Produk berhasil ditambahkan', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            navigate('/produkku', { replace: true })
        } catch (error) {
            toast.error(error.response?.data?.message || 'Terjadi Kesalahan. Silakan coba lagi', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        } finally {
            setLoading(false);
        }
    }
    
    //handle untuk preview
    const handlePreview = () => {
        if(!validateInput()) return
        const state = {
            id: location.state?.id,
            files: files,
            name: name,
            price: price,
            category: category,
            description: description,
            productId: productId,
        }
        navigate('/preview-produk', { replace: true, state: { previewData: state, prevPathname: location.pathname } })
    } 

    const handleDelete = () => {
        setFiles(prev => prev.filter((_,i) => i !== detailPictId))
        handleCloseModal()
    }

    const validateInput = () => {

        const rules = Validator.rules
        
        const validator = new Validator({ name, price, category, description, files }, {
            name: [ rules.required(), rules.max(255) ],
            price: [ rules.required(), rules.number(), rules.min(0) ],
            category: [ rules.required(), rules.inArray(['hobi', 'kendaraan', 'baju', 'elektronik', 'kesehatan']) ],
            description: [ rules.required() ],
            files: [ rules.required(), rules.array(), rules.min(1, "Foto harus diisi"), rules.max(4, "Foto maksimal 4"), {
                test: (value) => value.every(photo => photo.file?.size < 5e+6 || photo.file === null),
                errorMsg: 'Ukuran foto maksimal adalah 5MB'
            }]
        })

        setFormErrors(validator.getErrors(true));

        return validator.ok();
    }
    

    return (
        <main className='w-screen'>
            <Header title="Lengkapi Info Produk" withoutSearchBar />
            
            <div className='flex items-center flex-wrap max-w-xl mx-auto w-full'>
                <button className="hidden lg:inline-block mt-4 aspect-square p-2 relative right-8 rounded-full focus:ring-4 focus:ring-gray-500 focus:outline-none hover:bg-gray-200" onClick={() => navigate(-1)}>
                    <FiArrowLeft className='text-2xl' />
                </button>
                <div className="w-full px-8 items-center my-8 lg:mt-0">
                    <div className="">

                        {/* alert error message */}
                        <div className={ `flex items-center bg-red-600 text-white px-4 py-2 my-3 rounded relative ${errorMsg? "block":"hidden"}`}>
                            <FiAlertCircle className='text-base mr-2'/>
                            <p>{errorMsg}</p>
                        </div>
                        
                        <form onSubmit={ handlePublish } className="w-full">
                            <p className="mb-3 text-sm">Nama Produk</p>

                                <div className="mb-5">
                                    <input
                                        value={ name }
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" className={ `rounded-[16px] w-full px-4 py-2 font-normal text-sm bg-white 
                                        border transition ease-in-out m-0 focus:outline-none 
                                        ${ formErrors.name ? "focus:ring-1 focus:ring-red-500 border-red-500 caret-red-500 text-red-500" 
                                            : "focus:ring-2 focus:ring-purple-3 focus:caret-purple-3 text-neutral-3 border-neutral-2 focus:text-gray-700" 
                                        }`}
                                        id="nameInput" placeholder="Nama Produk" 
                                    />

                                    {/* error preview name */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.name? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{formErrors.name}</p>
                                    </div>

                                </div>

                            <p className="mb-3 text-sm">Harga Produk</p>
                                <div className="mb-5">
                                    <input
                                        value={ price }
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="text" className={ `rounded-[16px] w-full px-4 py-2 font-normal text-sm bg-white 
                                            border transition ease-in-out m-0 focus:outline-none 
                                            ${ formErrors.price ? "focus:ring-1 focus:ring-red-500 border-red-500 caret-red-500 text-red-500" 
                                                : "focus:ring-2 focus:ring-purple-3 focus:caret-purple-3 text-neutral-3 border-neutral-2 focus:text-gray-700" 
                                        }`}
                                        id="priceInput" placeholder="Rp 0,00" 
                                    />

                                    {/* error preview price */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.price? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{formErrors.price}</p>
                                    </div>

                                </div>

                            <p className="mb-3 text-sm">
                            Kategori</p>
                                <div className="mb-5">
                                    <select
                                        value={ category }
                                        onChange={(e) => setCategory(e.target.value)}
                                        className={ `rounded-[16px] w-full px-4 py-2 font-normal text-sm bg-white 
                                            border transition ease-in-out m-0 focus:outline-none 
                                            ${ formErrors.category ? "focus:ring-1 focus:ring-red-500 border-red-500 caret-red-500 text-red-500" 
                                                : "focus:ring-2 focus:ring-purple-3 focus:caret-purple-3 text-neutral-3 border-neutral-2 focus:text-gray-700" 
                                        }`}>
                                            <option selected>Pilih kategori</option>
                                            <option value="hobi">Hobi</option>
                                            <option value="kendaraan">Kendaraan</option>
                                            <option value="baju">Baju</option>
                                            <option value="elektronik">Elektronik</option>
                                            <option value="kesehatan">Kesehatan</option>
                                    </select>

                                    {/* error preview category */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.category? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{formErrors.category}</p>
                                    </div>  

                                </div>

                            <p className="mb-3 text-sm">
                            Deskripsi</p>
                                <div className="mb-5">
                                    <textarea
                                        value={ description }
                                        onChange={(e) => setDescription(e.target.value)}
                                        type="text" className={ `rounded-[16px] w-full px-4 py-2 font-normal text-sm bg-white 
                                            border transition ease-in-out m-0 focus:outline-none 
                                            ${ formErrors.description ? "focus:ring-1 focus:ring-red-500 border-red-500 caret-red-500 text-red-500" 
                                                : "focus:ring-2 focus:ring-purple-3 focus:caret-purple-3 text-neutral-3 border-neutral-2 focus:text-gray-700" 
                                        }`}
                                        id="descInput" rows="3" placeholder="Contoh: Jalan Ikan Hiu No 33" 
                                    />

                                    {/* error preview description */}
                                    <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.description? "block":"hidden"}`}>
                                        <FiAlertCircle className='mr-2'/>
                                        <p>{formErrors.description}</p>
                                    </div>  

                                </div>

                            <p className="mb-3 text-sm">
                            Foto Produk</p>
                                <div className='grid grid-cols-3 md:grid-cols-4 mb-5 gap-4'>
                                    {
                                        
                                        files.map((file,i) => (
                                            <button type='button' onClick={() => handleOpenPictModal(i)}>
                                                <img src={file.uri} className="w-full aspect-square rounded-[16px] object-cover mb-4" alt="foto produk" />
                                            </button>
                                        ))

                                    }
                                        <button onClick={() => inputButtonRef.current?.click()} type="button" className={`text-2xl text-neutral-3 p-9 bg-white w-full aspect-square border border-dashed border-neutral-2 rounded-2xl ${files.length >= 4 ? "hidden" : "flex"} justify-center items-center focus:ring-2 focus:ring-offset-2 focus:ring-purple-3 focus:outline-none focus:border-purple-3 focus:text-purple-3 hover:bg-gray-200`}>
                                            <FiPlus className="text-xl" />
                                            <input id="file-upload" type="file" ref={inputButtonRef} 
                                                className="w-full invisible absolute" onChange={handleSelectFile} disabled={isLoading} accept="images/*"
                                            />
                                        </button>
                                </div>

                                {/* alert size gambar */}
                                <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.files? "block":"hidden"}`}>
                                    <FiAlertCircle className='mr-2'/>
                                    <p>{formErrors.files}</p>
                                </div>                          
                                
                            {/* buttons */}
                            <div className="flex gap-4 w-full text-center pt-2">
                                {/* <button 
                                    disabled={ isLoading } onClick={ handleDelete }
                                    className={`${isEditProduct ? 'flex-grow' : 'hidden'} bg-red-600 hover:bg-red-700 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out`}
                                    type="button">
                                    Delete
                                </button> */}
                                <button 
                                    disabled={ isLoading } onClick={ handlePreview }
                                    className="flex-grow bg-white border border-purple-4 py-3 text-black font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out focus:ring-2 focus:ring-purple-4 focus:text-purple-4 focus:font-medium hover:bg-purple-1"
                                    type="button">
                                    { isLoading && <LoadingSpin /> }
                                    Preview
                                </button>
                                <button 
                                    disabled={ isLoading } 
                                    className="flex-grow bg-purple-4 hover:bg-purple-5 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-purple-3"
                                    type="submit">
                                    { isLoading && <LoadingSpin /> }
                                    Terbitkan
                                </button>
                            </div>
                        </form>
                    </div>
                </div> 

                {/* Modal for picture preview */}

                {/* modal backdrop */}
                <div onClick={handleCloseModal} className={`w-screen h-screen fixed ${isModalShow?'flex':'hidden'} items-center justify-center bg-black bg-opacity-70 top-0 left-0 z-50`}>

                    {/* modal body */}
                    <div onClick={(e)=>e.stopPropagation()} className={`${isModalPictShow?'bg-white':'hidden'} relative p-6 w-full mx-4 max-w-sm md:h-auto rounded-2xl`}>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-lg font-semibold'>Detail Foto Produk</p>
                            <img src={files[detailPictId]?.uri} className="w-60 h-60 rounded-xl aspect-square object-cover mb-6 mt-4" alt="foto produk" />
                        </div>
                        <div className='grid grid-cols-2'>
                        <button onClick={ handleDelete } className="flex items-center justify-center border border-red-500 text-red-500 hover:text-white hover:bg-red-500 font-normal text-sm rounded-2xl 
                                    focus:shadow-lg focus:outline-none active:shadow-lg mr-2" type="button"  >
                                Delete
                            </button>
                            <button onClick={handleCloseModal} className="flex items-center justify-center  py-2 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-2xl
                                    focus:shadow-lg focus:outline-none active:shadow-lg" type="button"  >
                                Close
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    )
}
