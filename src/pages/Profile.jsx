import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";

export default function ProductForm(props) {
  const navigate = useNavigate();

  return (
    <section className="h-full">
      <Header title="Lengkapi Info Akun" />
      <div className=" flex text-purple-4 items-center justify-center text-2xl  mx-auto h-24 bg-gray-400 w-24 rounded-xl ">
        <FiCamera />
      </div>

      <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap">
        <div className="w-full px-4 items-center my-8">
          <div className="lg:px-72 md:mx-12">
            <form>
              <p className="mb-3 text-sm">
                <button onClick={() => navigate(-1)}>
                  <FiArrowLeft className="invisible lg:visible mx-[-64px] mb-[-8px] text-2xl" />
                </button>
                Nama*
              </p>
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control rounded-[16px] w-full px-4 py-2 font-normal text-sm text-neutral-3 bg-white 
                                        border border-neutral-2  transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
                  id="nameInput"
                  placeholder="Nama Lengkap"
                />
              </div>

              <p className="mb-3 text-sm">Kota*</p>
              <div className="mb-5">
                <select
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
    </section>
  );
}
