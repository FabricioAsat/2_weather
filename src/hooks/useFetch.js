import { useEffect, useState } from "react";

export const useFetch = (url) => {
	const [dataFetch, setDataFetch] = useState({ data: null, isPending: true, error: null });

	useEffect(() => {
		async function getData() {
			try {
				const fetchResponse = await fetch(url);

				if (!fetchResponse.ok)
					// eslint-disable-next-line no-throw-literal
					throw { status: fetchResponse.status, statusText: fetchResponse.statusText };

				const data = await fetchResponse.json();

				setDataFetch({ data: data, isPending: false, error: null });
			} catch (error) {
				setDataFetch({ data: null, isPending: true, error: error });
				return dataFetch;
			}
		}
		getData();
	}, [url]);

	return dataFetch;
};
