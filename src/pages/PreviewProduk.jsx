import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FiArrowLeft, FiSearch, FiBell, FiList, FiUser } from 'react-icons/fi';

import Header from '../components/Header';
import LoadingSpin from '../components/LoadingSpin';
import configs from '../utils/configs';

import { formatRupiah, toTitleCase } from '../utils/helpers';

function PreviewProduk() {

    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const navigate = useNavigate();

    const [ isLoading, setLoading ] = useState(false);
    const [ productName, setProductName ] = useState(location.state?.previewData?.name)
    const [ category, setCategory ] = useState(location.state?.previewData?.category)
    const [ price, setPrice ] = useState(location.state?.previewData?.price)
    const [ description, setDescription ] = useState(location.state?.previewData?.description)
    const [ previewURIs, setPreviewURIs ] = useState(location.state?.previewData?.uris)
    const [ files, setFiles ] = useState(location.state?.previewData?.files)
    const [ productId, setProductId ] = useState(location.state?.previewData?.productId || 0);

    const terbitkanProduk = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append('name', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', category);
            files.forEach(file => formData.append("filenames",file)); 
            await axios({
                url: `${ configs.apiRootURL }${ productId ? '/products/'+productId : '/products' }`,
                method: productId ? 'PUT' : 'POST',
                headers: {
                    Authorization: `Bearer ${ auth.token }`
                },
                data: formData,
                timeout: 20000, //20 s
            })
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
                        previewURIs.map((uri, i) => <img 
                            key={ i } 
                            alt="Produk" 
                            className="w-full aspect-[6/5] object-cover md:rounded-xl" 
                            src={ uri } />
                        )
                    }
                </Carousel>
                <button 
                    onClick={ () => navigate(location.state?.prevPathname || -1, { state: location.state }) } 
                    disabled={ isLoading }
                    className="absolute top-4 left-4 rounded-full w-8 h-8 bg-white flex justify-center items-center focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    <FiArrowLeft />
                </button>
            </div>

            <div className="px-4 flex flex-col relative bottom-2 gap-4 md:flex-grow md:bottom-0">
                <div className="bg-white rounded-xl px-6 py-4 flex flex-col shadow-low md:shadow-high">
                    <h1 className="font-medium">{ productName }</h1>
                    <p className="text-sm text-neutral-3">{ toTitleCase(category) }</p>
                    <p className="">{ formatRupiah(price) }</p>

                    <button 
                        className="hidden md:block w-full bg-purple-4 font-medium text-white text-center py-2 mt-4 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 focus:outline-none"
                        disabled={ isLoading } 
                        onClick={ terbitkanProduk } 
                    >
                        Terbitkan
                    </button>
                    <button 
                        className="hidden md:block w-full border border-purple-4 bg-white font-medium text-neutral-5 text-center py-2 mt-4 rounded-lg"
                        disabled={ isLoading }
                        onClick={ () => navigate(location.state?.prevPathname || -1, { state: location.state }) } 
                    >
                        Edit
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

        <div className="pb-20 px-4 mt-2 md:max-w-screen-lg md:mt-4 md:mx-auto md:px-0 md:pb-0">
            <div className="flex bg-white rounded-xl px-6 py-4 shadow-low flex-col gap-2 md:w-3/5">
                <h1 className="font-medium">Deskripsi</h1>
                <p className="text-neutral-3">{ description }</p>
            </div>
        </div>

        <div className="fixed w-full bottom-4 px-4 md:hidden">
            <button 
                disabled={ isLoading } 
                onClick={ terbitkanProduk }
                className="bg-purple-4 font-medium text-white text-center py-4 flex justify-center w-full rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 focus:outline-none disabled:opacity-70"
            >
                { isLoading ? <span className="flex items-center"><LoadingSpin /> Mengirim...</span> : "Terbitkan" }
            </button>
        </div>
    </div>
}

export default PreviewProduk;