import React, { useState } from 'react'
import axios from 'axios'
import {Input} from 'antd'
import pic from '../assets/register.png'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../redux/slices/authSlice'
import { FiArrowLeft,FiAlertCircle } from 'react-icons/fi'
import LoadingSpin from '../components/LoadingSpin'

export default function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ name, setName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ isLoading, setLoading ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState("")
  const [ errorMsgName, setErrorMsgName ] = useState("")
  const [ errorMsgEmail, setErrorMsgEmail ] = useState("")
  const [ errorMsgPwd, setErrorMsgPwd ] = useState("")

  const handleRegister = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await axios({
        url: 'https://secondhand-backend-kita.herokuapp.com/users/register',
        method: 'POST',
        data: { name, email, password }
      })
      const token = response.data.token;
      dispatch(setToken(token))
      navigate('/')
    } catch (e) {
      if(e.response?.data?.errors?.name) setErrorMsgName(e.response?.data?.errors?.name);
      if(e.response?.data?.errors?.email) setErrorMsgEmail(e.response?.data?.errors?.email);
      if(e.response?.data?.errors?.password) setErrorMsgPwd(e.response?.data?.errors?.password);
      if(e.response) setErrorMsg(e.response.message);
      else setErrorMsg("Terjadi Kesalahan. Silakan periksa koneksi anda")
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="h-full">
    <div className="flex md:flex-none xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full">
      <div className="hidden md:block lg:w-6/12 items-center">
        <img src={pic} className="w-full m-0" alt="image register" />
      </div>
      <div className="lg:w-6/12 w-full px-4 md:px-0 items-center my-8">
        <div className="lg:px-12 md:mx-12">

          <button button onClick={() => navigate(-1)}>
            <FiArrowLeft className='lg:invisible item-left text-black text-xl'/>
          </button>
          
          <div className={ `flex items-center bg-red-600 text-white px-4 py-2 mt-3 rounded relative ${errorMsg? "block":"hidden"}`}>
            <FiAlertCircle className='text-base mr-2'/>
            <p>{errorMsg}</p>
          </div>
          
          <div className="text-left">
            <h4 className="text-2xl font-bold mb-4 pt-6">Daftar</h4>
          </div>

          <form onSubmit={ handleRegister }>
            <p className="mb-3 text-sm">Nama</p>
            <div className="mb-5">

              <Input 
                onChange={(e) => setName(e.target.value)}
                type="text" className={`form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                transition ease-in-out m-0 focus:text-gray-700 focus:outline-none 
                ${errorMsgName? "border-red-600 hover:border-red-600":"border-neutral-2"}`}
                id="nameInput" placeholder="Nama Lengkap" />

              <div className={`flex items-center text-red-600 text-sm mt-2 ${errorMsgName? "block":"hidden"}`}>
                <FiAlertCircle className='mr-2'/>
                <p>{errorMsgName}</p>
              </div>

            </div>
            <p className="mb-3 text-sm">Email</p>
            <div className="mb-5">

              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email" className={`form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none
                ${errorMsgEmail? "border-red-600 hover:border-red-600":"border-neutral-2"}`}
                id="emailInput" placeholder="Contoh: johndee@gmail.com" />

              <div className={`flex items-center text-red-600 text-sm mt-2 ${errorMsgEmail? "block":"hidden"}`}>
                <FiAlertCircle className='mr-2'/>
                <p>{errorMsgEmail}</p>
              </div>

            </div>
            <p className="mb-3 text-sm">Password</p>
            <div className="mb-5">

              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                type="password" className={`form-control px-2 py-2 font-normal text-base text-neutral-3 bg-white 
                border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none 
                ${errorMsgPwd? "border-red-600 hover:border-red-600":"border-neutral-2"}`}
                id="passwordInput" placeholder="Masukkan password" />

              <div className={`flex items-center text-red-600 text-sm mt-2 ${errorMsgPwd? "block":"hidden"}`}>
                <FiAlertCircle className='mr-2'/>
                <p>{errorMsgPwd}</p>
              </div>

            </div>
            

            <div className="text-center pt-2 mb-6">
              <button 
                disabled={ isLoading }
                className="flex justify-center items-center bg-purple-4 px-6 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out w-full mb-4 disabled:opacity-70 focus:ring-2 focus:ring-offset-2 focus:ring-purple-4"
                type="submit" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                  { isLoading && <LoadingSpin /> }
                Daftar
              </button>
            </div>
            <div className="text-center text-sm ">
              <p>Sudah punya akun?
                <Link to="/login" >
                  <button className="text-purple-4 hover:text-purple-3 font-semibold pl-1 
                    transition duration-300 ease-in-out">Masuk disini
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
