import {
	Box,
	Grid,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import Carousel, {consts} from 'react-elastic-carousel';
import ProductCard from 'features/Product/components/ProductCard';
import {calcSaleOf} from 'utils';
import styled from '@emotion/styled';
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

import HomeAside from 'features/Home/HomeAside';
import HomeMain from 'features/Home/HomeMain';

export default function RenderVariantsProduct({products = []}) {
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
	return (
		<Grid container>
			<HomeAside>
				<Box sx={{display: {xs: 'none', ms: 'none', md: 'block'}}}></Box>
			</HomeAside>
			<HomeMain>
				<Box component='header'>
					<Typography
						component='h4'
						style={{textTransform: 'uppercase', fontWeight: 500}}>
						RELATED PRODUCTS
					</Typography>
				</Box>

				<BoxWrapCarousel style={{position: 'relative'}}>
					{products && (
						<Carousel
							showEmptySlots={4 - products.length}
							enableAutoPlay={true}
							itemsToShow={carouselNumber}
							pagination={false}
							renderArrow={myArrow}>
							{products.map(item => (
								<ProductCard
									id={item.id}
									key={item.id}
									image={item.image}
									slug={item.slug}
									name={item.name}
									price={item.price}
									original_price={item.original_price}
									sale_of={calcSaleOf(item.price, item.original_price)}
									href={`/shop/${item.slug}`}
									amount={item.amount}
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
	}
`;
