import React from 'react'
import Header from '../components/Header'
import EmailPic from '../assets/undraw_mailbox.svg'

export default function EmailConfirm() {
  return (
   <div className="w-screen min-h-screen">
    <Header title="Konfirmasi Email" withoutSearchBar useBackButton />

    <div className="flex flex-col w-full px-4 py-16 lg:max-w-screen-lg lg:mx-auto">

      <div className="border border-gray-100 shadow-lg rounded-xl p-8 items-center">
        <div className='flex flex-col text-center items-center justify-center'>
            <p className='text-3xl font-base'>Email Aktivasi Telah Terkirim!</p>
            <img className="h-56 py-4 my-4" src={EmailPic}></img>
            <p className='text-lg font-normal'>Kami telah mengirim email ke alamat email kamu, 
                Klik confirmation link yang tertera untuk melanjutkan proses pendaftaran akun</p>
        </div>

      </div>

 

 
    </div>
  </div>
  )
}
