import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';

function RenderVariants({variants = [], productId}) {
	if (typeof variants !== 'object' && variants.length === 0) return null;
	return variants.map(p => (
		<Button
			variant={productId === p.id ? 'contained' : 'outlined'}
			size='small'
			style={{margin: '5px 10px'}}
			key={p?.id}
			component={Link}
			to={`/product/${p?.id}`}>
			{p?.variant_text}
		</Button>
	));
}

RenderVariants.propTypes = {
	variants: PropTypes.array.isRequired,
	productId: PropTypes.string.isRequired,
};

export default RenderVariants;
