import styled from '@emotion/styled';
import {
	Card,
	CardActions,
	CardContent,
	Skeleton,
	Typography,
} from '@mui/material';
import {BASE_SERVER_URL} from 'config/base-url';
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {TypographySpanStyled} from 'styles';
import {checkImageString} from 'utils';

function Product({
	image,
	slug,
	name,
	price,
	original_price,
	sale_of,
	status,
	href,
	amount,
}) {
	return (
		<Card sx={{height: 250}}>
			<CardContentStyled>
				{image && checkImageString(image) ? (
					<object
						data={BASE_SERVER_URL + '/products/image/' + image}
						height={120}
						width={'100%'}
						alt={slug}>
						<Skeleton variant='rectangular' width={'100%'} height={200} />
					</object>
				) : (
					<Skeleton variant='rectangular' width={'100%'} height={200} />
				)}
				{!status && (
					<TypographyOutOfStockText component='div'>
						Hết hàng
					</TypographyOutOfStockText>
				)}
			</CardContentStyled>

			<CardActionsStyled>
				<Typography component='div'>
					{/* Link to Detail */}
					<TypographyADivStyled component={Link} to={href || `#!${slug}`}>
						{name}
					</TypographyADivStyled>
				</Typography>

				<TypographyDivStyled component='div'>
					{price && <TypographyPStyled component='b'>{price}</TypographyPStyled>}
					{original_price && (
						<TypographyDelStyled component='del'>
							{original_price}
						</TypographyDelStyled>
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
	font-size: 14px;
	font-weight: 500;
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
	&:not(:first-of-type) {
		margin-left: 0;
	}
`;

const TypographyPStyled = styled(Typography)`
	font-weight: 600;
	font-size: 14px;
`;

const TypographyDelStyled = styled(Typography)`
	color: #666;
	font-size: 14px;
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
	amount: PropTypes.number,
};

export default Product;
