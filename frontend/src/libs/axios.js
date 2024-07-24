import base, { AxiosError } from 'axios';

const axios = base.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
});

export { axios, AxiosError };
