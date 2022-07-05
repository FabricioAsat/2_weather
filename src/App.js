import React, { useEffect, useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import { useFetch } from "./hooks/useFetch";

const initialData = {
	name: "",
	country: "",
	lat: undefined,
	lon: undefined,
	temp_c: undefined,
	condition: { text: "", icon: "" },
	local_time: "",
	last_update: "",
};
const App = () => {
	const [countryToSearch, setCountryToSearch] = useState("");
	const [url, setUrl] = useState("");
	const [data, setData] = useState(initialData);

	let fetch = useFetch(url);

	useEffect(() => {
		setData(initialData);
		if (fetch.isPending) {
			return;
		}

		const { data } = fetch;

		setData({
			name: data.location.name,
			country: data.location.country,
			local_time: data.location.localtime,
			lat: data.location.lat,
			lon: data.location.lon,
			temp_c: data.current.temp_c,
			condition: { text: data.current.condition.text, icon: data.current.condition.icon },
			last_update: data.current.last_updated,
		});
	}, [fetch, url]);

	// Controldor del input
	function handleChangeInputSearch(e) {
		setCountryToSearch(e.target.value);
	}

	// Controlador del button
	function handleSendRequest(e) {
		e.preventDefault();
		setUrl(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${countryToSearch}`);
		setCountryToSearch("");
	}

	return (
		<div className={`py-4`}>
			<form className="flex justify-center my-4" onSubmit={handleSendRequest}>
				<input
					type="text"
					onChange={handleChangeInputSearch}
					value={countryToSearch}
					className={`text-xl px-2 bg-gray-700 text-slate-200/75 outline-none`}
					placeholder="Buscar Ciudad"
				/>
				<input
					type="submit"
					value="Buscar"
					onClick={handleSendRequest}
					className={`font-bold px-6 py-2 border bg-gray-700 border-green-700 text-slate-200 ${
						countryToSearch.length === 0
							? "opacity-50 cursor-default"
							: "opacity-100 cursor-pointer"
					}`}
					disabled={!countryToSearch.length > 0}
				/>
			</form>

			{fetch.isPending ? (
				<div className="">
					{!fetch.error || (fetch.error.status >= 400 && fetch.error.status < 500) ? (
						<h2
							className={`text-4xl my-10 font-bold mx-auto text-center underline underline-offset-4 decoration-red-700`}>
							Ciudad no encontrada
						</h2>
					) : (
						<h2
							className={`text-4xl my-10 font-bold mx-auto text-center underline underline-offset-4 decoration-green-700`}>
							Realiza una Búsqueda
						</h2>
					)}
				</div>
			) : (
				<WeatherSearch data={data} />
			)}
		</div>
	);
};

export default App;
