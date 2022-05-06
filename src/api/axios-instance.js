import axios from 'axios';
import {getUserFromLocalStorage} from 'features/Auth/authSlice';
import {BASE_SERVER_URL} from './base-server-url';

const axiosInstance = axios.create({
	baseURL: BASE_SERVER_URL,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
	async config => {
		const user = getUserFromLocalStorage();
		config.headers = {
			Authorization: `Bearer ${user?.accessToken}`,
		};
		return config;
	},
	error => {
		Promise.reject(error);
	},
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	},
);

export default axiosInstance;
