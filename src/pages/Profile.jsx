import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import axios from "axios";

import Header from "../components/Header";

export default function ProductForm(props) {
  const navigate = useNavigate();
  const inputButtonRef = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [previewURI, setPreviewURI] = useState("");
  const [name, setName] = useState("");
  const [kota, setKota] = useState("");

  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgKota, setErrorMsgKota] = useState("");

  const handleSelectFile = async (e) => {
    if (!e.target.files[0]) return; //Jika tidak ngupload file, do nothing
    const file = e.target.files[0];
    setPreviewURI(URL.createObjectURL(file));

    const data = new FormData();
    data.append("file", file);

    try {
      setLoading(true); //Mendisable input dan tombol submit
      const response = await axios({
        method: "POST",
        url: "https://secondhand-backend-kita.herokuapp.com/users/lengkapi-profil", //TODO: Ganti URL nya
        data: data,
      });

      // Handle success (redirect ke mana gitu, home misal)
      navigate(-1, { replace: true });
    } catch (e) {
      if (e.response?.data?.errors?.name) setErrorMsgName(e.response?.data?.errors?.name);
      if (e.response?.data?.errors?.kota) setErrorMsgKota(e.response?.data?.errors?.email);

      // Handle error
    } finally {
      setLoading(false);
    }
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
            <form>
              <p className="mb-3 text-sm">
                <button onClick={() => navigate(-1)} disabled={isLoading}>
                  <FiArrowLeft className="invisible lg:visible mx-[-64px] mb-[-8px] text-2xl" />
                </button>
                Nama*
              </p>
              <div className="mb-5">
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className={`form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none 
                  ${errorMsgName ? "border-red-600 hover:border-red-600" : "border-neutral-2"}`}
                  id="nameInput"
                  placeholder="Nama Lengkap"
                  disabled={isLoading}
                />
                <div className={`flex items-center text-red-600 text-sm mt-2 ${errorMsgName ? "block" : "hidden"}`}>
                  <FiAlertCircle className="mr-2" />
                  <p>{errorMsgName}</p>
                </div>
              </div>

              <p className="mb-3 text-sm">Kota*</p>
              <div className="mb-5">
                <select
                  disabled={isLoading}
                  className="form-select w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2 rounded-[16px] transition ease-in-out focus:text-gray-700 focus:outline-none"
                >
                  <option selected>Pilih Kota</option>
                  <option value="1">Jakarta</option>
                  <option value="2">Surabaya</option>
                  <option value="3">Medan</option>
                  <option value="4">Bandung</option>
                  <option value="5">Makassar</option>
                  <option value="6">Semarang</option>
                  <option value="7">Palembang</option>
                  <option value="8">Batam</option>
                  <option value="9">Pekanbaru</option>
                  <option value="10">Malang</option>
                </select>
              </div>
              <p className="mb-3 text-sm">Alamat*</p>
              <div className="mb-5">
                <textarea
                  disabled={isLoading}
                  type="text"
                  className="form-control w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2 rounded-[16px] transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                  id="addressInput"
                  rows="3"
                  placeholder="Contoh: Jalan Ikan Hiu No 33"
                />
              </div>
              <p className="mb-3 text-sm">No.Handphone*</p>
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                  id="noHp"
                  placeholder="contoh: +628123456789"
                />
              </div>

              <div className="text-center pt-2 mb-6">
                <button
                  disabled={isLoading}
                  className="inline-block bg-purple-4 hover:bg-purple-3 px-6 py-3 text-white font-normal text-sm leading-tight rounded-[16px] 
                focus:shadow-lg focus:outline-none active:shadow-lg transition duration-200 ease-in-out w-full mb-4"
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
