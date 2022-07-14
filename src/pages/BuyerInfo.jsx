import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiX, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'

import { formatRupiah } from '../utils/helpers'
import buyerPic from '../assets/buyer-pic.png'
import productPic from '../assets/product.png'

import LoadingSpin from '../components/LoadingSpin'
import ModalTolakTawaran from '../components/modals/ModalTolakTawaran'
import ModalTerimaTawaran from '../components/modals/ModalTerimaTawaran'
import ModalStatusTawaran from '../components/modals/ModalStatusTawaran'
import configs from '../utils/configs'
import moment from 'moment'

export default function BuyerInfo(props) {

    const token = useSelector(state => state.auth.token);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const [isAcceptProcessing, setAcceptProcessing] = useState(false);

    const [isModalAcceptShow, setModalAcceptShow] = useState(false);
    const [isModalDeniedShow, setModalDeniedShow] = useState(false);
    const [isModalStatusShow, setModalStatusShow] = useState(false);
    const [data, setData] = useState({})

    const isModalShow = isModalAcceptShow || isModalStatusShow || isModalDeniedShow;
    const showChangeStatus = data.acceptedAt && !data.declinedAt && !data.soldAt;

    useEffect(() => {
        fetchData();
    }, [])

    const handleCloseModal = () => {
        setModalAcceptShow(false)
        setModalStatusShow(false)
        setModalDeniedShow(false)
    }

    const handleTerimaTawaran = async (e) => {
        try {
            setAcceptProcessing(true);
            await axios({
                url: `${ configs.apiRootURL }/bids/accept/${ data.id }`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            setModalAcceptShow(true);
            fetchData();
        } catch (error) {
            toast.error(e.response?.data?.message ?? "Terjadi kesalahan. Silakan coba lagi", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setAcceptProcessing(false)
        }
    }

    const handleOpenDeniedModal = () => {
        setModalDeniedShow(true)
    }
    const handleOpenStatusModal = () => {
        setModalStatusShow(true)
    }

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios({
                url: `${configs.apiRootURL}/products/history/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
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

                        <div className="flex flex-row items-center bg-white rounded-[12px] border shadow-md p-4 gap-4">
                            {
                                // Foto Penjual
                                isLoading ? <div className="w-12 aspect-square rounded-xl bg-slate-400 animate-pulse" />
                                    : <img src={data.buyerPic} className="w-12 aspect-square object-cover rounded-xl border border-neutral-2" alt="Penjual" />
                            }
                            {
                                //Detail Penjual
                                isLoading ? <div className="flex flex-col justify-between animate-pulse">
                                    <div className="mb-1 rounded-md bg-slate-400 h-4 w-24" />
                                    <div className="mb-1 rounded-md bg-slate-400 h-3 w-16" />
                                </div>
                                    : <div className="flex flex-col justify-between leading-normal">
                                        <p className="mb-1 text-black text-sm font-normal">{data.buyerName}</p>
                                        <p className="font-normal text-[10px] text-neutral-3 ">{data.buyerCity}</p>
                                    </div>
                            }
                        </div>

                        <p className='py-4 my-2 font-normal text-sm'>Produkmu yang Ditawar</p>

                        <div className="grid grid-cols-1 divide-y">
                            <div>
                                <div className="flex gap-4 py-3">
                                    {
                                        // Foto produk
                                        isLoading ? <div className="w-12 h-12 rounded-lg flex-none bg-slate-400 animate-pulse" />
                                            : <img className="w-12 h-12 object-cover rounded-lg flex-none" alt={data.productName} src={data.productImage?.[0]} />
                                    }

                                    {
                                        //Data produk
                                        isLoading ? <div className="flex-grow flex flex-col animate-pulse">
                                            <div className="h-2.5 rounded-md w-16 mb-1 bg-slate-400" />
                                            <div className="h-4 rounded-md w-24 mb-2 bg-slate-400" />
                                            <div className="h-4 rounded-md w-14 mb-2 bg-slate-400" />
                                            <div className="h-4 rounded-md w-20 mb-2 bg-slate-400" />
                                        </div>
                                            : <div className="flex-grow flex flex-col">
                                                <p className="text-[10px] text-neutral-3 mb-1">{data.soldAt ? "Berhasil Terjual" : "Penawaran Produk"}</p>
                                                <p className='mb-1'>{data.productName}</p>
                                                <p className='mb-1'>{formatRupiah(data.productPrice || 0)}</p>
                                                <p className={ data.declinedAt && "line-through" }>Ditawar {formatRupiah(data.bidPrice || 0)}</p>
                                            </div>
                                    }

                                    {
                                        isLoading ? <span className="flex-none h-2.5 w-10 bg-slate-400 rounded-md animate-pulse" />
                                            // : <span className="flex-none text-[10px] text-neutral-3">20 Apr, 14:04</span>
                                            : <span className="flex-none text-[10px] text-neutral-3">{moment(data.soldAt ?? data.declinedAt ?? data.acceptedAt ?? data.bidAt).format('D MMM, HH:mm')}</span>
                                    }
                                </div>

                                {/* Buttons */}
                                <div className={`${!data.isAcceptable || isLoading ? 'hidden' : 'grid'} grid-cols-2 lg:float-right text-center pt-4 pb-4`}>
                                    <button className="mr-2 px-[48px] py-2 inline-block bg-white border border-purple-4 hover:bg-gray-200 font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 disabled:opacity-70"
                                        type="button" onClick={handleOpenDeniedModal} disabled={isLoading || isAcceptProcessing}>
                                        Tolak
                                    </button>
                                    <button disabled={isLoading || isAcceptProcessing}
                                        className="btn focus:ring-2 focus:ring-offset-2 focus:ring-purple-4"
                                        type="button" onClick={handleTerimaTawaran} >
                                        {isAcceptProcessing && <LoadingSpin />}
                                        {isAcceptProcessing ? "Memproses..." : "Terima"}
                                    </button>
                                </div>
                                <div className={`${!showChangeStatus || isLoading ? 'hidden' : 'grid'} grid-cols-2 lg:float-right text-center pt-4 pb-4`}>
                                    <button className="flex items-center justify-center mr-2 px-8 py-2 bg-white border border-purple-4 hover:bg-gray-200 font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-purple-4 disabled:opacity-70"
                                        type="button" onClick={handleOpenStatusModal}>
                                        Status
                                    </button>
                                    <a href={`https://wa.me/${data.buyerPhone?.slice(1)}?text=Selamat,20%Penawaran20%Kamu20%telah20%berhasil.20%Silakan20%lakukan20%pembayaran.`} className="flex items-center justify-center ml-2 px-8 py-2 bg-purple-4 hover:bg-purple-5  text-white font-normal text-sm leading-tight rounded-[16px] 
                                    focus:shadow-lg focus:outline-none focus:ring-offset-2 focus:ring-purple-5 disabled:opacity-70"
                                        type="button" >
                                        <p>Hubungi di</p>
                                        <FaWhatsapp className='ml-2 text-sm' />
                                    </a>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalTolakTawaran show={ isModalDeniedShow } onClose={ () => setModalDeniedShow(false) } data={ data } onComplete={ fetchData } />
            <ModalTerimaTawaran show={ isModalAcceptShow } onClose={ () => setModalAcceptShow(false) } data={ data } onComplete={ fetchData } />
            <ModalStatusTawaran show={ isModalStatusShow } onClose={ () => setModalStatusShow(false) } data={ data } onComplete={ fetchData } />
            
        </section>

    )
}
