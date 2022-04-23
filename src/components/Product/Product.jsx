import React from 'react';
import PropTypes from 'prop-types';

import {
	Card,
	Skeleton,
	CardMedia,
	Typography,
	CardActions,
	CardContent,
} from '@mui/material';
import styled from '@emotion/styled';

import {checkImageString} from 'utils';

function Product({
	image,
	slug,
	name,
	price,
	originPrice,
	sale_of,
	status,
	href,
}) {
	return (
		<Card>
			<CardContentStyled>
				{image && checkImageString(image) ? (
					<CardMedia component='img' height={200} alt={slug} image={image} />
				) : (
					<Skeleton variant='rectangular' width={'100%'} height={200} />
				)}
				{status && (
					<TypographyOutOfStockText component='div'>
						Hết hàng
					</TypographyOutOfStockText>
				)}
			</CardContentStyled>

			<CardActionsStyled>
				<Typography component='div'>
					<TypographyADivStyled component='a' href={href || `#!${slug}`}>
						{name}
					</TypographyADivStyled>
				</Typography>

				<TypographyDivStyled component='div'>
					{price && <TypographyPStyled component='b'>{price}</TypographyPStyled>}
					{originPrice && (
						<TypographyDelStyled component='del'>{originPrice}</TypographyDelStyled>
					)}
					{sale_of && (
						<TypographySpanStyled component='span'>-{sale_of}%</TypographySpanStyled>
					)}
				</TypographyDivStyled>
			</CardActionsStyled>
		</Card>
	);
}

const CardContentStyled = styled(CardContent)`
	position: relative;
	padding: 0;
`;

const TypographyOutOfStockText = styled(Typography)`
	position: absolute;
	bottom: 10px;
	right: 10px;
	color: #fff;
	background-color: #111;
	padding: 3px 5px;
	border-radius: 7px;
`;

const CardActionsStyled = styled(CardActions)`
	flex-direction: column;
	align-items: flex-start;
	text-align: left;
`;

const TypographyADivStyled = styled(Typography)`
	color: #000;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const TypographyDivStyled = styled(Typography)`
	width: 100%;
	display: flex;
	flex-direction: row;
	column-gap: 10px;
	align-items: center;
	margin-top: 10px;
	&:not(:first-of-type) {
		margin-left: 0;
	}
`;

const TypographyPStyled = styled(Typography)`
	font-weight: 600;
	font-size: 1.2rem;
`;

const TypographyDelStyled = styled(Typography)`
	color: #666;
`;

const TypographySpanStyled = styled(Typography)`
	font-size: 0.9rem;
	color: #fff;
	background-color: #ff0000;
	padding: 3px;
	border-radius: 5px;
`;

Product.propTypes = {
	image: PropTypes.string,
	slug: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	originPrice: PropTypes.number,
	sale_of: PropTypes.number,
	status: PropTypes.bool,
	href: PropTypes.string,
};

export default Product;
