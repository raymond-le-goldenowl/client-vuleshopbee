import axios from 'axios';
import {BASE_SERVER_URL} from './base-url';

const axiosInstance = (accessToken = '') =>
	axios.create({
		baseURL: BASE_SERVER_URL,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		withCredentials: true,
	});

export default axiosInstance;
