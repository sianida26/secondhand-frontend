import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { toast } from 'react-toastify'

import { FiX } from 'react-icons/fi'

import LoadingSpin from '../LoadingSpin'
import configs from '../../utils/configs'

/**
 * Props:
 * show: boolean
 * onClose: () => void
 * onComplete: () => void
 * data: productData
 */
export default function ModalStatusTawaran(props) {

  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)

  const [isLoading, setLoading] = useState(false)
  const [choice, setChoice] = useState("yes")

  const handleSend = async () => {
    try {
      setLoading(true)
      await axios({
        url: `${configs.apiRootURL}/bids/${choice === 'yes' ? 'finish' : 'reject'}/${props.data.id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(`Tawaran berhasil ${ choice === 'yes' ? 'diselesaikan' : 'ditolak' }!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.onClose()
      if (choice === 'no') props.onComplete()
      else navigate('/produkku', { replace: true })
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
          Perbarui status penjualan produkmu
        </p>
        <form className='pt-6'>
          <div className="flex pb-3">
            <div className="flex items-center h-5">
              <input disabled={ isLoading } defaultChecked id="radio1" name="status" type="radio" value="yes" onChange={ (e) => setChoice(e.target.value) } className="accent-purple-4 focus:ring-[#C4C4C4] focus:ring-2 disabled:opacity-70" />
            </div>
            <div className="ml-3 text-sm">
              <label for="radio1" className={`font-medium text-sm ${ isLoading && 'opacity-70' }`}>
                Berhasil Terjual
              </label>
              <p id="radio1" className="text-sm font-normal text-neutral-3 my-2">
                Kamu telah sepakat menjual produk ini kepada pembeli
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center h-5">
              <input disabled={ isLoading } id="radio2" name="status" type="radio" value="no" onChange={ (e) => setChoice(e.target.value) } className="accent-purple-4 focus:ring-[#C4C4C4] focus:ring-2 disabled:opacity-70" />
            </div>
            <div className="ml-3 text-sm">
              <label for="radio2" className={`font-medium text-sm ${ isLoading && 'opacity-70' }`}>
                Batalkan Transaksi
              </label>
              <p id="radio2" className="text-sm font-normal text-neutral-3 my-2">
                Kamu membatalkan transaksi produk ini dengan pembeli
              </p>
            </div>
          </div>
        </form>
        <button className="btn w-full" disabled={ isLoading } type="button" onClick={ handleSend } >
          { isLoading ? <><LoadingSpin /> Mengirim...</> : 'Kirim' }
        </button>
      </div>
    </div>
  )
}
