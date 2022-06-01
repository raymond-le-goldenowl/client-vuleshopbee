import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	useMediaQuery,
	useTheme,
	IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import {BsArrowsFullscreen, BsSuitHeart} from 'react-icons/bs';

import DisplayImage from 'components/DisplayImage';

import {formatCash} from 'utils';
import {BASE_PRODUCT_IMAGE_URL} from 'api/base-server-url';

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
	const theme = useTheme();

	const matchesWithUpMD = useMediaQuery(theme.breakpoints.up('md'));
	const matchesWithDownLg = useMediaQuery(theme.breakpoints.up('lg'));
	const matchesWithDownXl = useMediaQuery(theme.breakpoints.up('xl'));

	let imageHeight = matchesWithUpMD ? 10 : 22;
	imageHeight = matchesWithDownLg ? 7 : imageHeight;
	imageHeight = matchesWithDownXl ? 5 : imageHeight;

	// set undefined to hide value if original_price equal with price
	if (original_price === price) original_price = undefined;
	return (
		<CardProductCartWrapper
			style={{position: 'relative', height: '100%'}}
			variant='outlined'>
			<CardContentStyled>
				<DisplayImage
					image={`${BASE_PRODUCT_IMAGE_URL}/${image}`}
					slug={slug}
					href={href}
					style={{
						width: '100%',
						height: `${imageHeight}vw`,
						position: 'relative',
						cursor: 'pointer',
					}}
				/>

				{/* Stock status */}
				<TypographyActionIcon component='p' className='action-display_type'>
					<IconButtonProductActionStyled>
						<BsArrowsFullscreen size={13} />
					</IconButtonProductActionStyled>
					<IconButtonProductActionStyled>
						<BsSuitHeart size={13} />
					</IconButtonProductActionStyled>
				</TypographyActionIcon>

				{/* Sale of percent */}
				{sale_of > 0 && (
					<TypographySaleOfText component='span'>-{sale_of}%</TypographySaleOfText>
				)}

				{/* Link to Detail */}
				<TypographyProductNameStyled component={Link} to={href || `#!${slug}`}>
					{name}
				</TypographyProductNameStyled>
				{/* Stock status */}
				{amount === 0 && (
					<TypographyOutOfStockText component='p'>Hết hàng</TypographyOutOfStockText>
				)}
				{/* Product Prices */}
				<TypographyProductPricesStyled component='div'>
					{original_price && (
						<TypographyProductOriginalPriceStyled component='del'>
							{formatCash(original_price)}
						</TypographyProductOriginalPriceStyled>
					)}
					{price && (
						<TypographyProductPriceStyled component='b'>
							{formatCash(price)}
						</TypographyProductPriceStyled>
					)}
				</TypographyProductPricesStyled>
			</CardContentStyled>

			<CardActionsStyled>
				{/* <ButtonAddToCartStyled fullWidth variant='outlined'>
					Add to cart
				</ButtonAddToCartStyled> */}
			</CardActionsStyled>
		</CardProductCartWrapper>
	);
}

const CardProductCartWrapper = styled(Card)`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;

	&:hover {
		.action-display_type {
			display: block;
		}
	}
`;

const ButtonAddToCartStyled = styled(Button)`
	color: #2bbef9;
	font-size: 12px;
	border-radius: 25px;
	padding: 5px 15px;
	text-transform: initial;

	&:hover {
		color: #fff;
		border-color: #2bbef9;
		background-color: #2bbef9;
	}
`;

const CardContentStyled = styled(CardContent)`
	position: relative;
	padding: 10px 5px 0 5px;
`;

const TypographySaleOfText = styled(Typography)`
	position: absolute;
	top: 0.9375rem;
	left: 0.9375rem;

	color: #fff;
	background-color: #2bbef9;

	font-size: 12px;
	border-radius: 4px;
	max-height: 1.5rem;
	padding: 0.1rem 0.4rem;
`;

const TypographyOutOfStockText = styled(Typography)`
	color: #00b853;
	font-weight: bold;
	font-size: 14px;
	margin: 0;
`;

const TypographyActionIcon = styled(Typography)`
	display: none;
	position: absolute;
	top: 0.9375rem;
	right: 0.9375rem;

	font-size: 12px;
	border-radius: 4px;
	height: auto;
	width: fit-content;
	padding: 0.1rem 0.4rem;
`;

const IconButtonProductActionStyled = styled(IconButton)`
	background-color: #ffffff;
	width: 2.125rem;
	height: 2.125rem;
	border: 1px solid #e2e4ec;
	border-radius: 50%;
	display: grid;
	place-content: center;
	margin-bottom: 10px;
	&:hover {
		color: #fff;
		border-color: #233a95;
		background-color: #233a95;
	}
`;

const CardActionsStyled = styled(CardActions)`
	flex-direction: column;
	align-items: flex-start;
	text-align: left;
	padding: 10px 5px;
`;

const TypographyProductNameStyled = styled(Typography)`
	position: relative;
	z-index: 2;
	color: #202435;
	display: block;
	font-size: 14px;
	font-weight: 600;
	text-decoration: none;
	padding-top: 10px;
	&:hover {
		color: #233a95;
	}
`;

const TypographyProductPricesStyled = styled(Typography)`
	width: 100%;
	display: flex;
	column-gap: 10px;
	flex-direction: row;
	align-items: center;
	padding: 10px 0;
	&:not(:first-of-type) {
		margin-left: 0;
	}
`;

const TypographyProductPriceStyled = styled(Typography)`
	font-size: 15px;
	color: #d51243;
	font-weight: bold;
`;

const TypographyProductOriginalPriceStyled = styled(Typography)`
	font-size: 14px;
	color: #c2c2d3;
	font-weight: 600;
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
