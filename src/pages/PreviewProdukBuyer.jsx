import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import axios from 'axios';

import { FiArrowLeft, FiX, FiHeart } from "react-icons/fi";
import { BsCartPlus, BsCartX } from "react-icons/bs";

import PullToRefresh from "react-simple-pull-to-refresh";

import Header from "../components/Header";
import LoadingSpin from "../components/LoadingSpin";
import configs from "../utils/configs";
import { formatRupiah } from "../utils/helpers";
import { toast } from 'react-toastify';
import notFoundImage from '../assets/undraw_not_found_re_qvvo.svg';
import { addItem, removeItem } from "../redux/slices/wishlistSlice";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// TODO: Ganti Seller's picture (ambil dari backend jika sudah dibenerin)

function PreviewProdukBuyer() {

  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const wishlists = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [isSending, setSending] = useState(false); //Is sending penawaran to server
  const [isLoading, setLoading] = useState(true); //is Loading product data
  const [showModal, setShowModal] = useState(false); //Is modal penawaran showing
  const [errorMessage, setErrorMessage] = useState("");
  const [productStatus, setProductStatus] = useState("")
  const [bidPrice, setBidPrice] = useState(0);
  const [productDetail, setProductDetail] = useState({
    id: 0,
    images: [],
    name: "",
    category: "",
    seller: {
      name: "",
      city: "",
      profilePicture: "",
    },
    description: "",
    price: 0,
  })

  const isAlreadyAddedToWishlist = wishlists.find(x => x.id === +id)

  useEffect(() => {
    requestProductDetail()
  }, []) //TODO: fix this

  const closeModal = () => {
    if (isSending) return; //prevent exit form modal while sending data
    setShowModal(false)
  }

  const openModal = () => {
    if (isLoading) return; //Prevent open modal while fetching data
    if (!token) return navigate('/login', { replace: true, state: { referrer: location.pathname } }) //Redirects to login page if not logged in yet
    setShowModal(true);
  }

  const showErrorToast = msg => toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
  });

  const handleAddWishlist = () => {
    if (isAlreadyAddedToWishlist){
      dispatch(removeItem(+id))
      return;
    };
    console.log('aku terpanggil')
    dispatch(addItem(productDetail))
  }

  const requestProductDetail = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const response = await axios({
        url: `${configs.apiRootURL}/products/detail-buyer/${id}`,
        headers: {
          Authorization: `Bearer ${ token }`,
        },
        method: 'GET',
      })
      setProductDetail(response.data);
      setProductStatus(response.data.status);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Terjadi Kesalahan. Silakan coba lagi'
      setErrorMessage(errorMsg);
      showErrorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const sendTawaran = async () => {
    try {
      setSending(true);
      await axios({
        url: `${ configs.apiRootURL }/bids/make-bid`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ token }`,
        },
        data: {
          id: productDetail.id,
          bidPrice: bidPrice,
        }
      })
      requestProductDetail();
      setBidPrice(0);
      setShowModal(false);
    } catch (e) {
      showErrorToast(e.response?.data?.message || 'Terjadi Kesalahan. Silakan coba lagi')
    } finally {
      setSending(false);
    }
  }

  const renderErrorScreen = () => {

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <img className="w-1/2" src={ notFoundImage } alt="Not Found" />
        <p>Oops! { errorMessage }</p>
        <button className="btn" onClick={ requestProductDetail }>Coba lagi</button>
      </div>
    )
  }

  return (
    <div className="w-screen min-h-screen overflow-x-none">
      {/* Header */}
      <Header title="Detail produk" hiddenOnSm />
      <PullToRefresh onRefresh={ requestProductDetail }>
      {
        errorMessage ? renderErrorScreen()
          : <><div className="flex flex-col md:flex-row md:max-w-screen-lg md:mx-auto md:mt-12">
            <div className="w-full aspect-[6/5] relative md:w-3/5 md:flex-shrink-0">
              {
                isLoading ? <div className="w-full h-full bg-slate-700 animate-pulse" />
                  : <Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop={true}>
                    {
                      productDetail.images.map(imageUrl => <img className="w-full aspect-[6/5] object-cover md:rounded-xl" src={imageUrl} alt={productDetail.name} />)
                    }
                  </Carousel>
              }
              <button className="absolute top-4 left-4 rounded-full w-8 h-8 bg-white flex justify-center items-center"  onClick={() => navigate(-1)}>
                <FiArrowLeft />
              </button>
            </div>

            <div className="px-4 flex flex-col relative bottom-2 gap-4 md:flex-grow md:bottom-0">
              <div className="bg-white rounded-xl px-6 py-4 flex flex-col shadow-low md:shadow-high">
                {
                  isLoading ? <div className="flex flex-col animate-pulse gap-2">
                    <div className="bg-slate-700 rounded-md w-36 h-4" />
                    <div className="bg-slate-700 rounded-md w-16 h-3" />
                    <div className="bg-slate-700 rounded-md w-24 h-4" />
                  </div>
                    : <div className="flex flex-col">
                      <h1 className="text-base font-medium">{productDetail.name}</h1>
                      <p className="text-sm text-neutral-3 mt-1 mb-4">{productDetail.category}</p>
                      <p className="text-base font-medium">{formatRupiah(productDetail.price)}</p>
                    </div>
                }

                <button
                  onClick={openModal}
                  disabled={isLoading}
                  className="hidden md:block w-full bg-purple-4 hover:bg-purple-5 font-medium text-white text-center py-2 mt-4 rounded-2xl focus:ring-2 focus:ring-offset-2 focus:ring-purple-4 focus:outline-none"
                >
                  Saya tertarik dan ingin nego
                </button>
                <button
                  disabled={isLoading}
                  onClick={ handleAddWishlist }
                  className="hidden md:block w-full justify-center items-center py-2 mt-2 rounded-2xl bg-red-500 font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none"
                >
                  <span className="flex gap-2 justify-center items-center">Masukkan ke wishlist<FiHeart className="mb-1" /></span>                 
                </button>
                {/* <button className="hidden md:block w-full border border-purple-4 bg-white font-medium text-neutral-5 text-center py-2 mt-4 rounded-lg">Edit</button> */}
              </div>

              <div className="flex bg-white rounded-xl px-6 py-4 shadow-low gap-4">
                {
                  isLoading ? <div className="h-14 aspect-square bg-slate-700 animate-pulse rounded-xl" />
                    : <img className="h-14 aspect-square rounded-xl object-cover" src={productDetail.seller.profilePicture} alt={productDetail.seller.name} />
                }
                {
                  isLoading ? <div className="flex flex-col justify-center animate-pulse gap-2">
                    <div className="bg-slate-700 rounded-md w-36 h-4" />
                    <div className="bg-slate-700 rounded-md w-24 h-3" />
                  </div>
                    : <div className="flex flex-col justify-center">
                      <h1 className="font-medium">{productDetail.seller.name}</h1>
                      <p className="text-sm text-neutral-3">{productDetail.seller.city}</p>
                    </div>
                }
              </div>
            </div>
          </div>

            <div className="pb-4 px-4 mt-2 md:max-w-screen-lg md:mt-4 md:mx-auto md:px-0 md:pb-0">
              <div className="flex bg-white rounded-xl px-6 py-4 shadow-low flex-col gap-2 md:w-3/5">
                <h1 className="font-medium">Deskripsi</h1>
                {
                  isLoading ? <div className="flex flex-col gap-2 animate-pulse">
                    <div className="bg-slate-700 rounded-md w-full h-4" />
                    <div className="bg-slate-700 rounded-md w-4/6 h-4" />
                    <div className="bg-slate-700 rounded-md w-5/6 h-4" />
                    <div className="bg-slate-700 rounded-md w-full h-4" />
                    <div className="bg-slate-700 rounded-md w-4/6 h-4" />
                    <div className="bg-slate-700 rounded-md w-5/6 h-4" />
                  </div>
                    : <p className="text-neutral-3">{productDetail.description}</p>
                }
              </div>
            </div>

            <div className="w-full px-4 md:hidden pb-4">
              <button
                onClick={openModal}
                disabled={isLoading || ["WAITING_CONFIRMATION", "TRANSACTION_DECLINED"].includes(productStatus)}
                className="btn w-full py-4 font-medium disabled:bg-purple-2 disabled:opacity-100"
              >
                {
                  productStatus === "BIDDABLE" ? "Saya tertarik dan ingin nego"
                  : productStatus === "WAITING_CONFIRMATION" ? "Menunggu Respon Penjual"
                  : productStatus === "TRANSACTION_DECLINED" ? "Penawaranmu Ditolak Penjual"
                  : ""
                }
              </button>
              <button
                  disabled={isLoading}
                  onClick={ handleAddWishlist }
                  className="btn w-full py-4 rounded-2xl bg-red-500 font-medium text-white mt-2 focus:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                >
                  <span className="flex gap-2 justify-center items-center">{ isAlreadyAddedToWishlist ? "Keluarkan dari wishlist" : <>Masukkan ke wishlist<FiHeart className="mb-1" /></> }</span>                 
                </button>
            </div>
        </>
      }
      </PullToRefresh>

      {/* Modal */}
      <div className={`w-screen h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-70 items-center justify-center p-4 ${showModal ? 'flex' : 'hidden'}`} onClick={closeModal}>
        <div className="bg-white shadow-high rounded-xl py-4 px-6 flex flex-col max-w-[24rem]" onClick={(e) => e.stopPropagation()}>
          <FiX className="self-end text-xl" onClick={closeModal} />

          <h1 className="font-medium">Masukkan Harga Tawarmu</h1>
          <p className="mt-4 text-[#8A8A8A]">Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan segera dihubungi penjual.</p>

          <div className="bg-[#EEEEEE] p-3 rounded-xl shadow-high flex mt-4 gap-2 items-center">
            <img className="h-12 aspect-square object-cover rounded-md" src={productDetail.images[0]} alt={productDetail.name} />
            <div className="">
              <p className="">{productDetail.name}</p>
              <p className="">{formatRupiah(productDetail.price)}</p>
            </div>
          </div>

          <label htmlFor="input-harga-tawar" className="mt-4 text-xs">Harga Tawar</label>
          <input
            name="input-harga-tawar"
            className="rounded-xl shadow-high py-3 px-4 mt-2 border border-[#D0D0D0] disabled:opacity-70"
            type="number"
            placeholder="Rp 0,00"
            value={ bidPrice ? bidPrice : "" }
            disabled={ isSending }
            onChange={ (e) => setBidPrice(e.target.value) }
          />

          <button
            className="btn mt-4 focus:ring-2 focus:ring-offset-2 focus:ring-purple-5"
            onClick={sendTawaran}
            disabled={isSending}
          >
            {
              isSending ? <div className="flex items-center justify-center">
                <LoadingSpin />
                <span>Mengirim...</span>
              </div>
                : "Kirim"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewProdukBuyer;
