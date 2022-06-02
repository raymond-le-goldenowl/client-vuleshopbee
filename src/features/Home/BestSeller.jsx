import {
	Box,
	Grid,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import HomeMain from './HomeMain';
import HomeAside from './HomeAside';
import {useDispatch, useSelector} from 'react-redux';
import {getBestSellers} from 'features/Product/productSlice';
import {useLayoutEffect} from 'react';
import Carousel, {consts} from 'react-elastic-carousel';
import ProductCard from 'features/Product/components/ProductCard';
import {calcSaleOf} from 'utils';
import styled from '@emotion/styled';
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import HBannerImageYoutube from 'assets/images/horizontal-banner-youtube-1.png';
import DisplayImage from 'components/DisplayImage';

export default function BestSeller() {
	const theme = useTheme();
	let carouselNumber = 2;
	const matchesWithXs = useMediaQuery(theme.breakpoints.up('xs'));
	const matchesWithSm = useMediaQuery(theme.breakpoints.up('sm'));
	const matchesWithMd = useMediaQuery(theme.breakpoints.up('md'));
	const matchesWithLg = useMediaQuery(theme.breakpoints.up('lg'));
	const matchesWithXl = useMediaQuery(theme.breakpoints.up('xl'));
	carouselNumber = matchesWithXs ? 2 : 1;
	carouselNumber = matchesWithSm ? 2 : carouselNumber;
	carouselNumber = matchesWithMd ? 3 : carouselNumber;
	carouselNumber = matchesWithLg ? 4 : carouselNumber;
	carouselNumber = matchesWithXl ? 4 : carouselNumber;

	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(getBestSellers());
	}, []);

	const {bestSellers} = useSelector(state => state.product);

	const myArrow = ({type, onClick, isEdge}) => {
		const isPrev = type === consts.PREV;
		const pointer = isPrev ? (
			<MdOutlineKeyboardArrowLeft size={22} />
		) : (
			<MdOutlineKeyboardArrowRight size={22} />
		);
		const styleArrowLeft = {
			position: 'absolute',
			top: '50%',
			left: '-20px',
			transform: 'translate(0, -50%)',
		};
		const styleArrowRight = {
			position: 'absolute',
			top: '50%',
			right: '-20px',
			transform: 'translate(0, -50%)',
		};
		return (
			<IconButtonArrowStyled
				style={isPrev ? styleArrowLeft : styleArrowRight}
				onClick={onClick}
				disabled={isEdge}>
				{pointer}
			</IconButtonArrowStyled>
		);
	};

	if (bestSellers.length < 4) return null;

	return (
		<Grid container marginTop={4}>
			<HomeAside>
				<Box sx={{display: {xs: 'none', ms: 'none', md: 'block'}}}>
					<DisplayImage
						image={HBannerImageYoutube}
						style={{width: '100%', boxSizing: 'border-box', padding: '20px'}}
					/>
				</Box>
			</HomeAside>
			<HomeMain>
				<Box component='header'>
					<Typography
						component='h4'
						style={{textTransform: 'uppercase', fontWeight: 500}}>
						BEST SELLERS
					</Typography>
					<Typography variant='caption'>
						Do not miss the current offers until the end of March.
					</Typography>
				</Box>

				<BoxWrapCarousel style={{position: 'relative'}}>
					{bestSellers && bestSellers.length >= 4 && (
						<Carousel
							itemsToShow={carouselNumber}
							pagination={false}
							renderArrow={myArrow}>
							{bestSellers.map(item => (
								<ProductCard
									key={item.product_id}
									image={item.product_image}
									slug={item.product_slug}
									name={item.product_name}
									price={item.product_price}
									original_price={item.product_original_price}
									sale_of={calcSaleOf(item.product_price, item.product_original_price)}
									href={`/product/${item.product_id}`}
									amount={item.product_amount}
								/>
							))}
						</Carousel>
					)}
				</BoxWrapCarousel>
			</HomeMain>
		</Grid>
	);
}

const IconButtonArrowStyled = styled(IconButton)`
	background-color: #ffffff;
	font-size: 1.125rem;
	width: 2.625rem;
	height: 2.625rem;
	border: 1px solid #e2e4ec;
	border-radius: 50%;
	z-index: 3;

	&:disabled {
		background-color: #ffffff;
	}

	&:hover {
		background-color: #ffffff;
	}
`;

const BoxWrapCarousel = styled(Box)`
	& .rec.rec-slider-container {
		margin: 0;
		& .rec.rec-item-wrapper {
			height: 100%;
			border-bottom: 1px solid rgba(0, 0, 0, 0.12);
		}
	}
`;
