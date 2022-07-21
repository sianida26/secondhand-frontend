import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

import Header from "../components/Header";
import configs from "../utils/configs";
import Validator from '../utils/Validator';
import { setData } from "../redux/slices/authSlice";
import LoadingSpin from "../components/LoadingSpin";

export default function ProductForm(props) {
  const navigate = useNavigate();
  const inputButtonRef = useRef(null);
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [previewURI, setPreviewURI] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!auth.name) return;
    setName(auth.name);
  }, [auth, setName]);

  const validateInput = () => {

    const rules = Validator.rules
    
    const validator = new Validator({ name, city, phone, address }, {
        name: [ rules.required(), rules.max(255) ],
        city: [ rules.required(), rules.max(255)],
        phone: [ rules.required(), rules.min(8), rules.regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/) ],
        address: [ rules.required() ],
    })

    setFormErrors(validator.getErrors(true));

    return validator.ok();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    data.append("city", city);
    data.append("address", address);
    data.append("phone", phone);

    try {
      setLoading(true); //Mendisable input dan tombol submit
      const response = await axios({
        method: "POST",
        url: `${ configs.apiRootURL }/users/lengkapi-profil`,
        headers: {
          Authorization: `Bearer ${ auth.token }`,
        },
        data: data,
      });

      // Handle success
      dispatch(setData({ name, city, profilePhoto: response.data.image }))
      navigate(-1, { replace: true });
    } catch (e) {
      setFormErrors(e.response?.data?.errors ?? {})
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  const handleSelectFile = async (e) => {
    if (!e.target.files[0]) return; //Jika tidak ngupload file, do nothing
    const _file = e.target.files[0];
    setPreviewURI(URL.createObjectURL(_file));
    setFile(_file);
  };

  return (
    <main className="w-screen">
      <Header title="Lengkapi Info Akun" />
      <div className="w-screen my-6">
        <div className={`flex text-purple-4 items-center justify-center text-2xl mx-auto h-24 ${!previewURI && "bg-gray-400"} w-24 rounded-xl relative group`}>
          <div onClick={() => inputButtonRef.current?.click()} className={`absolute ${previewURI && "hidden group-hover:flex w-full h-full bg-black bg-opacity-50 justify-center items-center rounded-xl"} `}>
            <div className="flex flex-col items-center">
              <FiCamera className="text-neutral-3 text-lg" />
            </div>
          </div>
          <input ref={inputButtonRef} disabled={isLoading} type="file" accept="images/*" className="h-full w-full opacity-0" id="prodInput" onChange={handleSelectFile} />

          {/* Preview gambar */}
          {previewURI && <img src={previewURI} className="object-cover aspect-square w-full rounded-xl" alt="Foto Profil" />}
        </div>
      </div>

      <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap">
        <div className="w-full px-4 items-center my-8">
          <div className="lg:px-72 md:mx-12">
            <form onSubmit={ handleSubmit }>
              <p className="mb-3 text-sm">
                <button onClick={() => navigate(-1)} disabled={isLoading}>
                  <FiArrowLeft className="invisible lg:visible mx-[-64px] mb-[-8px] text-2xl" />
                </button>
                Nama<span className="text-red-500">*</span>
              </p>
              <div className="mb-5">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={ name }
                  type="text"
                  className={`form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none border 
                  ${formErrors.name ? "border-red-600 hover:border-red-600" : "border-neutral-2"}`}
                  id="nameInput"
                  placeholder="Nama Lengkap"
                  disabled={isLoading}
                />
                <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.name ? "block" : "hidden"}`}>
                  <FiAlertCircle className="mr-2" />
                  <p>{formErrors.name}</p>
                </div>
              </div>

              <p className="mb-3 text-sm">Kota<span className="text-red-500">*</span></p>
              <div className="mb-5">
                <select
                  disabled={isLoading}
                  onChange={ (e) => setCity(e.target.value) }
                  value={ city }
                  className={`form-select w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border ${formErrors.city ? "border-red-600 hover:border-red-600" : "border-neutral-2"} rounded-[16px] transition ease-in-out focus:text-gray-700 focus:outline-none`}
                >
                  <option selected>Pilih Kota</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Batam">Batam</option>
                  <option value="Batang">Batang</option>
                  <option value="Blitar">Blitar</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Makassar">Makassar</option>
                  <option value="Malang">Malang</option>
                  <option value="Mataram">Mataram</option>
                  <option value="Medan">Medan</option>
                  <option value="Palembang">Palembang</option>
                  <option value="Pekanbaru">Pekanbaru</option>
                  <option value="Semarang">Semarang</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Toraja Utara">Toraja Utara</option>
                </select>
                <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.city ? "block" : "hidden"}`}>
                  <FiAlertCircle className="mr-2" />
                  <p>{formErrors.city}</p>
                </div>
              </div>
              <p className="mb-3 text-sm">Alamat<span className="text-red-500">*</span></p>
              <div className="mb-5">
                <textarea
                  disabled={isLoading}
                  type="text"
                  onChange={ (e) => setAddress(e.target.value)}
                  value={ address }
                  className={`form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border ${formErrors.address ? "border-red-600 hover:border-red-600" : "border-neutral-2"} rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none`}
                  id="addressInput"
                  rows="3"
                  placeholder="Contoh: Jalan Ikan Hiu No 33"
                />
                <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.address ? "block" : "hidden"}`}>
                  <FiAlertCircle className="mr-2" />
                  <p>{formErrors.address}</p>
                </div>
              </div>
              <p className="mb-3 text-sm">No.Handphone<span className="text-red-500">*</span></p>
              <div className="mb-5">
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  value={ phone }
                  className={`form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border ${formErrors.phone ? "border-red-600 hover:border-red-600" : "border-neutral-2"}  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none`}
                  id="noHp"
                  placeholder="contoh: +628123456789"
                />
                <div className={`flex items-center text-red-600 text-sm mt-2 ${formErrors.phone ? "block" : "hidden"}`}>
                  <FiAlertCircle className="mr-2" />
                  <p>{formErrors.phone}</p>
                </div>
              </div>

              <div className="text-center pt-2 mb-6">
                <button
                  disabled={isLoading}
                  className="bg-purple-4 hover:bg-purple-3 px-6 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out w-full mb-4 disabled:opacity-70 flex items-center justify-center"
                  type="submit"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  { isLoading ? <><LoadingSpin /> Menyimpan...</> : "Simpan" }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
