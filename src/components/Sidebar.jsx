import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FiLogIn, FiX } from "react-icons/fi";

export default function Sidebar(props) {

	const isLoggedIn = useSelector(state => !!state.auth.token);

	return (
		<div
			className={`w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-70 z-[100] lg:hidden ${
				props.show ? "flex" : "hidden"
			}`}
			onClick={() => props.close()}
		>
			<div
				className="h-screen px-4 bg-white py-4 flex flex-col float-left w-48"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between items-center">
					<Link to="/"><h1 className="font-bold text-lg">Second Hand</h1></Link>
					<FiX
						className="text-xl text-neutral-5"
						onClick={props.close}
					/>
				</div>
				<div className="mt-4 flex flex-col gap-3">
					{isLoggedIn ? (
						<>
							<Link to="/notifikasi" className="">
								Notifikasi
							</Link>
							<Link to="/produkku" className="">
								Daftar Jual
							</Link>
							<Link to="/wishlist" className="">
								Wishlist
							</Link>
							<Link to="/akun-saya" className="">
								Akun Saya
							</Link>
						</>
					) : (
						<Link to="/login" className="btn self-start">
							<FiLogIn /> Masuk
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
