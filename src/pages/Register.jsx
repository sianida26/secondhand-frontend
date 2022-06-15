import React from 'react'
import pic from '../assets/register.png'
import arrow from '../assets/fi_arrow-left.png'
import {Input} from "antd"


export default function Register() {
  return (
    <section className="h-full">
    <div className="lg:flex lg:flex-wrap g-0 flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full">
      <div className=" hidden md:block lg:w-6/12 items-center lg:rounded-r-lg lg:rounded-bl-none">
        <img src={pic} className="w-full m-0" alt="image register" />
      </div>
      <div className="lg:w-6/12 md:px-0 items-center my-8">
        <div className="md:p-12 md:mx-12 items-center ">
            <a href="" className='lg:invisible item-left mb-6 pb-3'><img src={arrow} /></a>
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-4 pb-1 pt-6">Daftar</h4>
              </div>
          <form>
            <p className="mb-3 text-sm">Nama</p>
            <div className="mb-5">
              <Input type="text" className="form-control block w-full px-4 py-2 font-normal text-base text-gray-700 bg-white bg-clip-padding border border-solid
               border-gray-400 rounded-[14px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                id="nameInput" placeholder="Nama Lengkap" />
            </div>
            <p className="mb-3 text-sm">Email</p>
            <div className="mb-4">
              <Input
                type="email" className="form-control block w-full px-4 py-2 font-normal text-base text-gray-700 bg-white bg-clip-padding border border-solid
                border-gray-400 rounded-[14px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                id="emailInput" placeholder="Contoh: johndee@gmail.com" />
            </div>
            <p className="mb-3 text-sm">Password</p>
            <div className="mb-4">
              <Input.Password
                type="password" className="form-control block w-full px-4 py-2 font-normal text-base text-gray-700 bg-white bg-clip-padding border border-solid
                border-gray-400 rounded-[14px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                id="passwordInput" placeholder="Masukkan password"
              />
              
            </div>
            <div className="text-center pt-2 mb-6 pb-1">
              <button className="inline-block bg-purple-5 hover:bg-purple-4 px-6 py-2.5 text-white font-medium text-sm leading-tight rounded-[14px] shadow-md 
                focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                Daftar
              </button>
            </div>
            <div className="text-center text-sm">
              <p className="md:mb-5 md:pt-0 mb-0 mr-0">Sudah punya akun?
                <a href="#" className="text-purple-4 hover:text-purple-3 font-semibold pl-1 transition duration-200 ease-in-out">Masuk disini
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>           
    </div>
</section>
  )
}
