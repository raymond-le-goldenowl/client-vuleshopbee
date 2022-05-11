// import {store} from 'App/store';
import axios from 'axios';
import {getUserFromLocalStorage} from 'features/Auth/authSlice';
import {BASE_SERVER_URL} from './base-server-url';

const axiosInstance = axios.create({
	baseURL: BASE_SERVER_URL,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
	async config => {
		// const tk = store.getState().auth?.user?.accessToken;
		// console.log('token from get state tk: ', tk);

		// get user, and get accessToken
		const user = getUserFromLocalStorage();
		config.headers = {
			Authorization: `Bearer ${user?.accessToken}`,
			// Authorization: `Bearer ${tk}`,
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
