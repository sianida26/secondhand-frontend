import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { formatRupiah } from "../utils/helpers";

export default function ProductCard(props) {

	const navigate = useNavigate();

	return (
		<Link to={ `/produk/${ props.id }` } className="shadow-low p-4 text-neutral-5 rounded-lg w-full h-full flex flex-col">
			{/* Product image */}
			{props.isLoading ? (
				<div className="w-full aspect-[7/5] animate-pulse bg-slate-700" />
			) : (
				<img
					className="w-full aspect-[7/5] object-cover"
					src={props.image}
					alt="Jam"
				/>
			)}

			{props.isLoading ? (
				<div className="flex flex-col gap-1 mt-4 animate-pulse">
					<div className="w-32 h-4 bg-slate-700 rounded-md"></div>
					<div className="w-24 h-3 bg-slate-700 rounded-md"></div>
					<div className="w-20 h-4 bg-slate-700 rounded-md"></div>
				</div>
			) : (
				<div className="flex flex-col gap-1 mt-4 justify-between flex-grow">
					<h1 className="line-clamp-2">{props.name}</h1>
					<div className="flex flex-col gap-1">
						<p className="text-sm text-neutral-3">{props.category}</p>
						<p>{formatRupiah(props.price)}</p>
					</div>
				</div>
			)}
		</Link>
	);
}
