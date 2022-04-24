import React from 'react';
import PropTypes from 'prop-types';
import {Container, Grid} from '@mui/material';
import Product from 'components/Product';

function RenderListProduct({products}) {
	const productMapped = products.map(product => (
		<Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
			<Product {...product} />
		</Grid>
	));

	return (
		<Container maxWidth='md'>
			<Grid container spacing={2}>
				{productMapped}
			</Grid>
		</Container>
	);
}

RenderListProduct.propTypes = {
	products: PropTypes.array,
};

export default RenderListProduct;
