import axiosInstance from 'config/axios-instance';

const PRODUCT_URL = '/products';
const FILTER_PRODUCT_URL = PRODUCT_URL + '/filters';
// const FILTER_PRODUCT_WITH_OPTIONS_URL = FILTER_PRODUCT_URL + `?page=${}&per_page=${}&category_id=${}&tag=${}&price_from=${}&price_to=${}&sort=${}&search=${}`;
// Get user products
const getProducts = async () => {
	const response = await axiosInstance().get(FILTER_PRODUCT_URL);
	return response.data;
};

const loadMoreProducts = async (page, perPage, value = '') => {
	const response = await axiosInstance().get(
		FILTER_PRODUCT_URL + `?page=${page}&per_page=${perPage}&search=${value}`,
	);
	return response.data;
};

const getOneProduct = async productId => {
	const response = await axiosInstance().get(PRODUCT_URL + '/' + productId);
	return response.data;
};

const searchProductByName = async value => {
	const response = await axiosInstance().get(
		FILTER_PRODUCT_URL + `?search=${value}`,
	);
	return response.data;
};

const productService = {
	getProducts,
	loadMoreProducts,
	getOneProduct,
	searchProductByName,
};

export default productService;
