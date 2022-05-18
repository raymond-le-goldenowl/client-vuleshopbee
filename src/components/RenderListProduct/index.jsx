import PropTypes from 'prop-types';
import {Grid} from '@mui/material';

import ProductCard from 'features/Product/components/ProductCard';

import {calcSaleOf} from 'utils';
import {useWindowSize} from 'hooks/use-window-size';
import {useEffect} from 'react';

function RenderListProduct({products = []}) {
	const windowSize = useWindowSize();
	useEffect(() => {}, [windowSize]);

	const productMapped = products.map(product => {
		return (
			<Grid key={product?.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
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
		<Grid container spacing={2} columns={{xs: 9, sm: 12, md: 12, lg: 12, xl: 12}}>
			{productMapped}
		</Grid>
	);
}

RenderListProduct.propTypes = {
	products: PropTypes.array,
};

export default RenderListProduct;
