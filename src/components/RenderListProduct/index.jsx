import PropTypes from 'prop-types';
import {Grid} from '@mui/material';

import ProductCard from 'features/Product/components/ProductCard';

import {calcSaleOf} from 'utils';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getBestSellers} from 'features/Product/productSlice';

function RenderListProduct({products = []}) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getBestSellers());
	}, []);

	const productMapped = products.map(product => {
		console.log(product);
		return (
			<Grid key={product?.id} item xs={6} sm={6} md={4} lg={3} xl={3}>
				<ProductCard
					{...product}
					href={`/shop/${product?.slug}`}
					sale_of={calcSaleOf(product?.price, product?.original_price)}
					amount={product?.amount}
				/>
			</Grid>
		);
	});

	// for one colunm when xs size
	// 			columns={{xs: 12, sm: 12, md: 12, lg: 12, xl: 12}}
	return <Grid container>{productMapped}</Grid>;
}

RenderListProduct.propTypes = {
	products: PropTypes.array,
};

export default RenderListProduct;
