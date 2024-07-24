import * as React from 'react';

import { AxiosError, axios } from '@/libs/axios';

const useFetch = (url) => {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(url, {
					signal: controller.signal,
				});
				setData(data);
			} catch (error) {
				if (error instanceof AxiosError) setError(error.response?.data.message);
				else setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => controller.abort();
	}, [url]);

	return { data, error, loading };
};

export default useFetch;
