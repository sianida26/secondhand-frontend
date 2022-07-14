import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios'
import { toast } from 'react-toastify'

import { FiAlertCircle } from 'react-icons/fi'

import LoadingSpin from '../LoadingSpin'
import configs from '../../utils/configs'

/**
 * Props:
 * show: boolean
 * onClose: () => void
 * onComplete: () => void
 * data: productData
 */
export default function TolakTawaran(props) {

  const token = useSelector(state => state.auth.token)
  const [ isLoading, setLoading ] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await axios({
        url: `${ configs.apiRootURL }/bids/reject/${ props.data.id }`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ token }`
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
    } catch (e){
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
    <div onClick={ !isLoading && props.onClose } className={`w-screen h-screen fixed left-0 top-0 ${props.show ? 'flex' : 'hidden'} items-center justify-center bg-black bg-opacity-70 top-0 left-0 z-50`}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white relative p-6 w-full mx-4 max-w-sm md:h-auto rounded-2xl">
        <div className='flex justify-center items-center'>
          <FiAlertCircle className='text-red-600 text-6xl' />
        </div>
        <p className='text-center text-sm font-medium pb-2 my-4'>
          Apakah kamu yakin ingin menolak tawaran ini?
        </p>
        <div className='grid grid-cols-2'>
          <button disabled={ isLoading } onClick={!isLoading && props.onClose} className="flex items-center justify-center py-2 bg-purple-4 hover:bg-purple-5 text-white font-normal text-sm rounded-2xl
                        focus:shadow-lg focus:outline-none active:shadow-lg mr-2 disabled:opacity-70" type="button">
            Ga jadi
          </button>
          <button disabled={ isLoading } className="flex items-center justify-center py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-normal text-sm rounded-2xl 
                        focus:shadow-lg focus:outline-none active:shadow-lg disabled:opacity-70 gap-2" type="button" onClick={handleDelete}>
            { isLoading ? <><LoadingSpin /> Menolak...</> : "Tolak" }
          </button>
        </div>
      </div>
    </div>
  )
}
