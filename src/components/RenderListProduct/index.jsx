import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@mui/material';

import ProductCard from 'components/ProductCard';

import {calcSaleOf} from 'utils';

function RenderListProduct({products = []}) {
	const productMapped = products.map(product => {
		return (
			<Grid key={product?.id} item xs={6} sm={4} md={4} lg={4} xl={3}>
				<ProductCard
					{...product}
					href={`/product/${product?.id}`}
					sale_of={calcSaleOf(product?.price, product?.original_price)}
					amount={product?.amount}
				/>
			</Grid>
		);
	});

	return (
		<Grid container spacing={2}>
			{productMapped}
		</Grid>
	);
}

RenderListProduct.propTypes = {
	products: PropTypes.array,
};

export default RenderListProduct;
