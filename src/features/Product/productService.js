import axiosInstance from 'api/axios-instance';

const PRODUCT_URL = '/products';
// const FILTER_PRODUCT_WITH_OPTIONS_URL = FILTER_PRODUCT_URL + `?page=${}&per_page=${}&category_id=${}&tag=${}&price_from=${}&price_to=${}&sort=${}&search=${}`;

// Get user products
const getProducts = async () => {
	const data = await axiosInstance.get(`${PRODUCT_URL}/filters`);
	return data;
};

const getBestSellers = async () => {
	return await axiosInstance.get(`order-item/best-sellers`);
};
const loadMoreProducts = async (page, perPage, value = '') => {
	const data = await axiosInstance.get(
		`${PRODUCT_URL}/filters?page=${page}&per_page=${perPage}&search=${value}`,
	);
	return data;
};

const getOneProduct = async productId => {
	const data = await axiosInstance.get(`/product-tag/${productId}`);
	return data;
};

const searchProductByName = async value => {
	const data = await axiosInstance.get(`${PRODUCT_URL}/filters?search=${value}`);
	return data;
};

const productService = {
	getProducts,
	loadMoreProducts,
	getOneProduct,
	searchProductByName,
	getBestSellers,
};

export default productService;
