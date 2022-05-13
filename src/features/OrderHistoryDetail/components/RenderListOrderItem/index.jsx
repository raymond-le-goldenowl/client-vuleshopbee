import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import DisplayImage from 'components/DisplayImage';
import {BASE_SERVER_URL} from 'api/base-server-url';
import {formatCash} from 'utils';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled';

function RenderListOrderItem({orderItems}) {
	return orderItems.map(item => {
		const {product} = item;

		return (
			<Paper key={item?.id} style={{padding: 10}}>
				<Grid container columnSpacing={{md: 2}} margin='auto'>
					<Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
						<DisplayImage
							image={BASE_SERVER_URL + '/products/image/' + product?.image}
							style={{height: 200, width: '100%'}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={2} lg={4} xl={4}>
						<TypographyStyled component={Link} to={`/product/${product?.id}`}>
							{product?.name}
						</TypographyStyled>
					</Grid>
					<Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
						<TypographyStyled>Số lượng: {item?.quantity}</TypographyStyled>
					</Grid>
					<Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
						<TypographyStyled>{formatCash(product?.price)}</TypographyStyled>
					</Grid>
				</Grid>
			</Paper>
		);
	});
}

const TypographyStyled = styled(Typography)`
	font-weight: 600;
	font-size: 1.1rem;
	color: #000;
	text-decoration: none;

	&[href]:hover {
		text-decoration: underline;
	}
`;

export default RenderListOrderItem;
