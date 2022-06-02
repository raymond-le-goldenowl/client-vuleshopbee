import axiosInstance from 'api/axios-instance';

const CATEGORIES = '/categories';

// Get orders
const getCategories = async () => {
	const data = await axiosInstance.get(CATEGORIES);
	return data;
};

// Get orders
const categoriesService = {
	getCategories,
};

export default categoriesService;
