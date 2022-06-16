import React from 'react'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/slices/authSlice'
import pic from '../assets/register.png'
import { Link } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {Input} from "antd"

export default function Login() {

  const dispatch = useDispatch();

  const purakPurakLogin = () => {
    const token = "purakPurakToken";
    dispatch(setToken(token));
  }

  return (
    <section className="h-full md:h-screen">
    <div className="flex md:flex-none xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full">
      <div className="hidden md:block lg:w-6/12 items-center">
        <img src={pic} className="w-full m-0" alt="image register" />
      </div>
      <div className="lg:w-6/12 w-full px-4 md:px-0 items-center my-8">
        <div className="lg:px-12 md:mx-12">
           <Link to="/">
              <button>
                <FiArrowLeft className='lg:invisible item-left text-black text-xl'/>
              </button>
            </Link>
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-4 pt-6">Login</h4>
              </div>
          <form>
            <p className="mb-3 text-sm">Email</p>
            <div className="mb-5">
              <Input
                type="email" className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                id="emailInput" placeholder="Contoh: johndee@gmail.com" />
            </div>
            <p className="mb-3 text-sm">Password</p>
            <div className="mb-5">
              <Input.Password
                type="password" className="form-control px-2 py-2 font-normal text-base text-neutral-3 bg-white 
                border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                id="passwordInput" placeholder="Masukkan password" />
            </div>

            <div className="text-center pt-2 mb-6">
              <button className="inline-block bg-purple-4 hover:bg-purple-3 px-6 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out w-full mb-4"
                type="button" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                Login
              </button>
            </div>
            <div className="text-center text-sm">
              <p className="md:mb-5 md:pt-0">Belum punya akun?
                <Link to="/register" >
                  <button className="text-purple-4 hover:text-purple-3 font-semibold pl-1 
                    transition duration-300 ease-in-out">Daftar disini
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>           
    </div>
</section>
  )
}
