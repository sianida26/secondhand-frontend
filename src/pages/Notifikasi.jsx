import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import moment from 'moment';

import Header from "../components/Header";
import { formatRupiah } from "../utils/helpers";
import BlankIllustration from '../assets/undraw_selection.svg'

export default function Notifikasi() {

    const navigate = useNavigate();
    const notifications = useSelector(state => state.notification.items)

    // const [notifications, setNotifications] = useState([])
    const [isLoading, setLoading] = useState(false);

    const handleClickNotification = (notificationData) => {
        const previewData = {
            name: notificationData.productName,
            category: notificationData.category,
            price: notificationData.price,
            description: notificationData.description,
            files: notificationData.image.map(x => ({ file:null, uri: x })),
            productId: notificationData.productId,
        }

        if (notificationData.type === "Berhasil diterbitkan") return navigate('/preview-produk', { state: { previewData, readOnly: true } })
        if (["Anda menawar produk", "Penawaran diterima"].includes(notificationData.type)) return navigate(`/produk/${ notificationData.productId }`)
        return navigate(`/penawaran/${notificationData.bidId}`);
    }

    return (
        <section className="h-full">
            <Header title="Notifikasi" />

            <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap">
                <div className="w-full px-4 items-center my-4">
                    <div className="lg:px-72 md:mx-12">
                        <div className="grid grid-cols-1 divide-y">

                            {/* Item notifikasi */}
                            {
                                isLoading ?
                                    [...new Array(10)].map((_, i) => (
                                        <div className="flex flex-col bg-white py-4 animate-pulse" key={i}>
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl mr-4 bg-slate-400 flex-none" />
                                                <div className="flex flex-col w-full gap-1">
                                                    <div className="flex justify-between text-neutral-3">
                                                        <div className="h-2.5 w-16 bg-slate-400 rounded-lg" />
                                                        <div className="flex gap-2 items-center">
                                                            <div className="h-2.5 w-10 bg-slate-400 rounded-lg" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="h-5 w-24 rounded-md bg-slate-400" />
                                                        <div className="h-5 w-24 rounded-md bg-slate-400" />
                                                        <div className="h-5 w-24 rounded-md bg-slate-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    : notifications.length === 0 ? <div className="w-full h-full flex flex-col items-center justify-center">
                                        <img className="w-full object-cover" src={BlankIllustration} alt="Illustration" />
                                        <p className="text-center mt-4">Notifikasi kamu kosong nih!</p>
                                    </div>
                                        : notifications.map(notification => (
                                            <div className="flex flex-col bg-white py-4" key={notification.id} onClick={() => handleClickNotification(notification)}>
                                                <div className="flex gap-4">
                                                    <img
                                                        src={notification.image[0]}
                                                        alt={notification.productName}
                                                        className="w-12 h-12 rounded-xl border border-neutral-2 mr-4"
                                                    />
                                                    <div className="flex flex-col w-full gap-1">
                                                        <div className="flex justify-between text-[10px] text-neutral-3">
                                                            <p>{notification.type}</p>
                                                            <div className="flex gap-2 items-center">
                                                                <p>{moment(notification.time).format('D MMM, HH:mm')}</p>
                                                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm">
                                                            <p>{notification.productName}</p>
                                                            <p className={notification.type === "Berhasil terjual" && "line-through"}>{formatRupiah(notification.price)}</p>
                                                            <p className={notification.type === "Penawaran ditolak" && "line-through"}>{notification.bidPrice && `${notification.type === "Berhasil terjual" ? "Terjual" : "Ditawar"} ${formatRupiah(notification.bidPrice)}`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
