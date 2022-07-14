import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios'
import { toast } from 'react-toastify'

import { FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import LoadingSpin from '../LoadingSpin'
import configs from '../../utils/configs'
import { formatRupiah } from '../../utils/helpers'

/**
 * Props:
 * show: boolean
 * onClose: () => void
 * onComplete: () => void
 * data: productData
 */
export default function ModalTerimaTawaran(props) {

    const token = useSelector(state => state.auth.token)
    const [isLoading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true)
            await axios({
                url: `${configs.apiRootURL}/bids/reject/${props.data.id}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success('Tawaran berhasil ditolak!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.onClose()
            props.onComplete()
        } catch (e) {
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
            setLoading(false)
        }
    }

    return (
        <div onClick={!isLoading && props.onClose} className={`w-screen h-screen fixed left-0 top-0 ${props.show ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-70 top-0 left-0 z-50`}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white absolute bottom-0 lg:relative p-6 w-full lg:max-w-sm md:h-auto rounded-t-2xl lg:rounded-2xl">
                <button className='float-right'>
                    <FiX onClick={props.onClose} className='text-xl mb-2' />
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
                        <img className="w-[48px] h-[48px] rounded-[12px] border border-neutral-2" alt="buyer" src={props.data.buyerPic} />
                        <div className="flex flex-col justify-between ml-4">
                            <p className="mb-1 font-medium text-sm">{ props.data.buyerName }</p>
                            <p className="font-normal text-[10px] text-neutral-3 ">{ props.data.buyerCity }</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-4">
                        <img className="w-[48px] h-[48px] rounded-[12px] border border-neutral-2" alt="produk" src={props.data.productImage?.[0]} />
                        <div className="flex flex-col justify-between ml-4 text-sm">
                            <p className='mb-1'>{ props.data.productName }</p>
                            <p className='mb-1'><s>{formatRupiah(props.data.productPrice ?? 0)}</s></p>
                            <p>Ditawar {formatRupiah(props.data.bidPrice ?? 0)}</p>
                        </div>
                    </div>
                </div>
                <a href={`https://wa.me/${props.data.buyerPhone?.slice(1)}?text=Selamat,20%Penawaran20%Kamu20%telah20%berhasil.20%Silakan20%lakukan20%pembayaran.`} className="flex items-center justify-center w-full py-3 mt-6 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-[16px] 
                    focus:shadow-lg focus:outline-none active:shadow-lg" type="button"  >
                    <p>Hubungi via Whatsapp</p>
                    <FaWhatsapp className='ml-2 text-sm' />
                </a>
            </div>
        </div>
    )
}
