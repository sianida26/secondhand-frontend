import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FiArrowLeft } from 'react-icons/fi';

import Header from '../components/Header';
import LoadingSpin from '../components/LoadingSpin';
import configs from '../utils/configs';

import { formatRupiah, toTitleCase } from '../utils/helpers';
import { requestUpdateNotification } from '../redux/slices/notificationSlice';

function PreviewProduk() {

    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ isLoading, setLoading ] = useState(false);
    const [ isDeleting, setDeleting ] = useState(false);
    const [ productName, setProductName ] = useState(location.state?.previewData?.name)
    const [ category, setCategory ] = useState(location.state?.previewData?.category)
    const [ price, setPrice ] = useState(location.state?.previewData?.price)
    const [ description, setDescription ] = useState(location.state?.previewData?.description)
    const [ files, setFiles ] = useState(location.state?.previewData?.files)
    const [ productId, setProductId ] = useState(location.state?.previewData?.productId || 0);

    const handleDeleteProduct = async () => {
        if (!productId) return;
        try {
            setDeleting(true)
            setLoading(true)
            await axios({
                url: `${ configs.apiRootURL }/products/delete-product/${ productId }`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${ auth.token }`,
                },
                timeout: 20000,
            })
            toast.success('Produk berhasil dihapus!', {
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
        }
        catch (error) {
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
            setDeleting(false);
        }
    }

    const terbitkanProduk = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('name', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            files.filter(file => file.file !== null).forEach(file => formData.append("files",file.file || file.uri)); 
            files.filter(file => file.file === null).forEach(file => formData.append("oldFileUrls[]", file.uri)) 
            await axios({
                url: `${ configs.apiRootURL }${ productId ? '/products/'+productId : '/products' }`,
                method: productId ? 'PUT' : 'POST',
                headers: {
                    Authorization: `Bearer ${ auth.token }`
                },
                data: formData,
                timeout: 20000, //20 s
            })
            dispatch(requestUpdateNotification())
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

    return <div className="w-screen min-h-screen">

        {/* Header */}
        <div className="hidden md:block">
            <Header />
        </div>

        <div className="flex flex-col md:flex-row md:max-w-screen-lg md:mx-auto md:mt-12">
            <div className="w-full aspect-[6/5] relative md:w-3/5 md:flex-shrink-0">
                <Carousel 
                    infiniteLoop={true}
                    showArrows={false} 
                    showStatus={false} 
                    showThumbs={false} 
                >
                    {
                        files.map((file, i) => <img 
                            key={ i } 
                            alt="Produk" 
                            className="w-full aspect-[6/5] object-cover md:rounded-xl" 
                            src={ file.uri } />
                        )
                    }
                </Carousel>
                <button 
                    onClick={ () => navigate(location.state?.prevPathname || -1, { state: {...location.state, fromPreview: true, product: { id: location.state?.previewData.productId }}, replace: true }) } 
                    disabled={ isLoading }
                    className="absolute top-4 left-4 rounded-full w-8 h-8 bg-white flex justify-center items-center focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <FiArrowLeft />
                </button>
            </div>

            <div className="px-4 flex flex-col relative bottom-2 gap-4 md:flex-grow md:bottom-0">
                <div className="bg-white rounded-xl px-6 py-4 flex flex-col shadow-low md:shadow-high">
                    <h1 className="text-base font-medium">{ productName }</h1>
                    <p className="text-sm text-neutral-3 mt-1 mb-4">{ toTitleCase(category) }</p>
                    <p className="text-base font-medium">{ formatRupiah(price) }</p>

                    <button 
                        className="hidden md:block w-full bg-purple-4 font-medium text-white text-center py-2 mt-4 rounded-[16px] focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 focus:outline-none"
                        disabled={ isLoading || location.state?.readOnly } 
                        onClick={ terbitkanProduk } 
                    >
                        Terbitkan
                    </button>
                    <button 
                        className="hidden md:block w-full border border-purple-4 bg-white font-medium text-neutral-5 text-center py-2 mt-4 rounded-[16px]"
                        disabled={ isLoading || location.state?.readOnly }
                        onClick={ () => navigate(location.state?.prevPathname || -1, { state: {...location.state, fromPreview: true, product: { id: location.state?.previewData.productId }}, replace: true }) } 
                    >
                        Edit
                    </button>
                    <button 
                        className={`hidden ${ productId && "md:flex" } items-center justify-center w-full bg-red-600 hover:bg-red-700 font-medium text-white text-center py-2 mt-4 rounded-[16px] focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:outline-none`}
                        disabled={ isLoading || isDeleting || location.state?.readOnly }
                        onClick={ handleDeleteProduct }
                    >
                        { isDeleting ? <><LoadingSpin /> Menghapus...</> : "Hapus" }
                    </button>
                </div>

                <div className="flex bg-white rounded-xl px-6 py-4 shadow-low gap-4">
                    <img 
                        className="h-14 aspect-square rounded-xl object-cover" 
                        src={ auth.profilePhoto } 
                        alt={ auth.name } 
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="font-medium">{ auth.name }</h1>
                        <p className="text-sm text-neutral-3">{ auth.city }</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="pb-4 px-4 mt-2 md:max-w-screen-lg md:mt-4 md:mx-auto md:px-0 md:pb-0">
            <div className="flex bg-white rounded-xl px-6 py-4 shadow-low flex-col gap-2 md:w-3/5">
                <h1 className="font-medium">Deskripsi</h1>
                <p className="text-neutral-3">{ description }</p>
            </div>
        </div>

        <div className="flex flex-col w-full bottom-4 px-4 md:hidden">
            <button 
                disabled={ isLoading || location.state?.readOnly } 
                onClick={ terbitkanProduk }
                className="bg-purple-4 font-medium text-white text-center py-3 flex justify-center w-full rounded-2xl focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 focus:outline-none disabled:opacity-70"
            >
                { isLoading ? <span className="flex items-center"><LoadingSpin /> Mengirim...</span> : "Terbitkan" }
            </button>
            <button 
                className="border border-purple-4 bg-white font-medium w-full my-2 text-neutral-5 text-center py-3 rounded-2xl"
                disabled={ isLoading || location.state?.readOnly }
                onClick={ () => navigate(location.state?.prevPathname || -1, { state: {...location.state, fromPreview: true, product: { id: location.state?.previewData.productId }}, replace: true }) } 
            >
                Edit
            </button>
            <button 
                className={`bg-red-600 flex items-center justify-center font-medium text-white text-center py-3 mb-4 rounded-2xl w-full focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:outline-none ${ !productId && "hidden" }`}
                disabled={ isLoading || isDeleting || location.state?.readOnly }
                onClick={ handleDeleteProduct }
            >
                { isDeleting ? <><LoadingSpin /> Menghapus...</> : "Hapus" }
            </button>
        </div>
    </div>
}

export default PreviewProduk;