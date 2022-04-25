import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ProductService from 'services/product.service';
const productService = ProductService;

function ProductDetail() {
	const params = useParams();
	const [product, setProduct] = useState({
		id: null,
		name: null,
		model: null,
		original_price: null,
		price: null,
		slug: null,
		image: null,
		tutorial: null,
		description: null,
		platform: null,
		status: null,
		sale_of: null,
		variant_id: null,
		variant_title: null,
		variant_text: null,
		additional_information: null,
		amount: null,
		created_at: null,
		updated_at: null,
		deleted_at: null,
		category: null,
		discounts: [],
		tags: [],
	});

	useEffect(() => {
		async function getProductDetail() {
			// const productId = 'viettel15gb-123af-asdf-2312';
			const {productId} = params;
			const product = await productService.getProductDetail(productId);
			setProduct(product);
		}
		getProductDetail();
	}, [params]);

	return <div>ProductDetail</div>;
}

ProductDetail.propTypes = {};

export default ProductDetail;
