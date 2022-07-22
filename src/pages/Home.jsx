import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"

import axios from 'axios';

import { FiSearch } from "react-icons/fi";

import gambarKado from "../assets/png_gift_88837.png";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import configs from "../utils/configs";

import notFoundIllustration from "../assets/undraw_void.svg";

const categories = [
	"Semua",
	"Hobi",
	"Kendaraan",
	"Baju",
	"Elektronik",
	"Kesehatan",
];

export default function Home() {

	const token = useSelector(state => state.auth.token);

	const [selectedCategory, setSelectedCategory] = useState(categories[0]); //Defaultnya nampilkan semua produk
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [_search, _setSearch] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			//do something
			setSearch(_search)
		}, 1000)

		return () => clearTimeout(delayDebounceFn)
	},[_search])

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

	const handleSearchChange = (e) => {
		_setSearch(e.target.value);
	}

	const renderedProducts = products.filter(product => selectedCategory === "Semua" || product.category === selectedCategory.toLowerCase()).filter(product => product.name.toLowerCase().includes(search.toLowerCase()))

	return (
		<div className="w-screen min-h-screen">
			<Header home onSearchChange={handleSearchChange} />
			{/* Hero */}
			<div className="bg-gradient-to-b from-[#FFE9C9] to-transparent pb-12">

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
				<div className="flex overflow-x-auto gap-4 mt-4">
					{categories.map((category, i) => (
						<button
							className={`btn py-4 flex-shrink-0 ${
								selectedCategory !== category &&
								"bg-purple-1 text-neutral-4 focus:bg-purple-2 hover:bg-purple-2"
							}`}
							onClick={() => setSelectedCategory(category)}
							key={ i }
						>
							<FiSearch className="text-2xl" />
							{category}
						</button>
					))}
				</div>
			</div>

			{/* Products list */}
			<div className={`w-full place-items-center gap-4 px-4 mt-4 ${ !isLoading && renderedProducts.length === 0 ? "" : "grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6" }`}>
				{isLoading
					? [...new Array(10)].map((x) => <ProductCard isLoading />)
					: renderedProducts.length === 0? 
					<div className="w-full h-full flex flex-col items-center justify-center py-8">
						<img className="w-60" src={ notFoundIllustration } alt="illustration" />
						<p className="text-center mt-4 text-base">Yah! Item dengan kategori ini belum tersedia :&#40;</p>
					</div>
					: renderedProducts.map((product) => (
							<ProductCard
								key={ product.id }
								isLoading={isLoading}
								image={product.image ? product.image[0] : ''}
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
