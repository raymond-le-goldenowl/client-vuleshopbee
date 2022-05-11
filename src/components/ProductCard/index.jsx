import {
	Card,
	CardActions,
	CardContent,
	Skeleton,
	Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';

import {checkImageString} from 'utils';
import {TypographySpanStyled} from 'styles';
import {BASE_SERVER_URL} from 'api/base-server-url';

function ProductCard({
	image,
	slug,
	name,
	price,
	original_price,
	sale_of,
	href,
	amount,
}) {
	// set undefined to hide value if original_price equal with price
	if (original_price === price) original_price = undefined;
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
				{amount === 0 && (
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
					{sale_of > 0 && (
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
	top: 10px;
	right: 10px;
	color: #fff;
	font-weight: bold;
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
	font-size: 14px;
	font-weight: 500;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const TypographyDivStyled = styled(Typography)`
	width: 100%;
	display: flex;
	column-gap: 10px;
	flex-direction: row;
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

ProductCard.propTypes = {
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

export default ProductCard;
