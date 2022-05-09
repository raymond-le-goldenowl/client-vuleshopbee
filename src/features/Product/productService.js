import axiosInstance from 'api/axios-instance';

const PRODUCT_URL = '/products';
const FILTER_PRODUCT_URL = PRODUCT_URL + '/filters';
// const FILTER_PRODUCT_WITH_OPTIONS_URL = FILTER_PRODUCT_URL + `?page=${}&per_page=${}&category_id=${}&tag=${}&price_from=${}&price_to=${}&sort=${}&search=${}`;

// Get user products
const getProducts = async () => {
	const data = await axiosInstance.get(FILTER_PRODUCT_URL);
	return data;
};

const loadMoreProducts = async (page, perPage, value = '') => {
	const data = await axiosInstance.get(
		FILTER_PRODUCT_URL + `?page=${page}&per_page=${perPage}&search=${value}`,
	);
	return data;
};

const getOneProduct = async productId => {
	const data = await axiosInstance.get(PRODUCT_URL + '/' + productId);
	const tags = await axiosInstance.get(`/product-tag/${productId}`);
	data.product.tags = tags;
	return data;
};

const searchProductByName = async value => {
	const data = await axiosInstance.get(FILTER_PRODUCT_URL + `?search=${value}`);
	return data;
};

const productService = {
	getProducts,
	loadMoreProducts,
	getOneProduct,
	searchProductByName,
};

export default productService;
