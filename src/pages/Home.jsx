import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

import axios from 'axios';

import { FiLogIn, FiMenu, FiSearch } from "react-icons/fi";

import gambarJam from "../assets/jam.png";
import gambarKado from "../assets/png_gift_88837.png";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import configs from "../utils/configs";

const categories = [
	"Semua",
	"Hobi",
	"Kendaraan",
	"Baju",
	"Elektronik",
	"Kesehatan",
];

const fakeProductsData = [
	{
		id: 1,
		category: "Hobi",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 2,
		category: "Kendaraan",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 3,
		category: "Baju",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 4,
		category: "Elektronik",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 5,
		category: "Kesehatan",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 6,
		category: "Hobi",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 6,
		category: "Hobi",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 6,
		category: "Hobi",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 6,
		category: "Hobi",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
	{
		id: 6,
		category: "Hobi",
		image: gambarJam,
		price: Math.floor(Math.random() * 90000) + 1000,
	},
];

export default function Home() {

	const token = useSelector(state => state.auth.token);
	const isLoggedIn = !!token;

	const [selectedCategory, setSelectedCategory] = useState(categories[0]); //Defaultnya nampilkan semua produk
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const response = await axios({
				url: `${configs.apiRootURL}/products/available`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${ token }`
				}
			});
			setProducts(response.data);
		} catch (e) {
			setSelectedCategory(0)
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-screen min-h-screen">
			<Sidebar
				show={isMobileSidebarOpen}
				close={() => setMobileSidebarOpen(false)}
				loggedIn={ isLoggedIn }
			/>
			{/* Hero */}
			<div className="bg-gradient-to-b from-[#FFE9C9] to-transparent pb-12">
				{/* Header */}
				<div className="w-full flex pt-8 px-4 gap-4 lg:bg-white lg:shadow-high lg:justify-between lg:py-4 lg:px-16">
					<button
						className="w-12 h-12 p-3 bg-white rounded-2xl lg:hidden"
						onClick={() => setMobileSidebarOpen(true)}
					>
						<FiMenu className="w-full h-full" />
					</button>

					<div className="flex-grow lg:flex-grow-0 lg:flex lg:justify-center lg:items-center lg:gap-4">
						<div className="hidden lg:inline w-[5.88rem] h-8 bg-purple-5"></div>
						<div className="h-12 bg-white rounded-2xl py-3 px-6 text-neutral-3 flex lg:bg-[#EEEEEE]">
							<input
								className="w-full h-full bg-transparent"
								placeholder="Cari di sini ..."
							/>
							<FiSearch className="text-2xl" />
						</div>
					</div>

					<div className="hidden lg:flex">
						<Link to="/login">
							<button className="btn shadow-none">
								<FiLogIn />
								Masuk
							</button>
						</Link>
					</div>
				</div>

				{/* Content */}
				<div className="flex py-4 px-3 pt-12 items-center justify-center">
					{/* left content */}
					<div className="flex flex-col justify-center">
						<h1 className="text-2xl font-bold">
							Bulan Ramadhan Banyak diskon!
						</h1>
						<p className="mt-4">Diskon Hingga</p>
						<p className="text-allert-danger text-xl font-medium">
							60%
						</p>
					</div>

					{/* right content */}
					<div className="flex justify-center items-center flex-shrink-0">
						<img className="w-32" src={gambarKado} alt="Kado" />
					</div>
				</div>
			</div>

			{/* Categories */}
			<div className="flex flex-col px-4">
				<p className="font-medium">Telusuri Kategori</p>
				<div className="flex overflow-x-scroll gap-4 mt-4">
					{categories.map((category, i) => (
						<button
							className={`btn py-4 flex-shrink-0 ${
								selectedCategory !== category &&
								"bg-purple-1 text-neutral-4 focus:bg-purple-2 hover:bg-purple-2"
							}`}
							key={ i }
						>
							<FiSearch className="text-2xl" />
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Products list */}
			<div className="w-full grid grid-cols-2 place-items-center gap-4 px-4 mt-4 lg:grid-cols-5 xl:grid-cols-8">
				{isLoading
					? [...new Array(10)].map((x) => <ProductCard isLoading />)
					: products.map((product) => (
							<ProductCard
								key={ product.id }
								isLoading={isLoading}
								image={product.image[0]}
								name={product.name}
								category={product.category}
								price={product.price}
								id={ product.id }
							/>
					  ))}
			</div>
		</div>
	);
}
