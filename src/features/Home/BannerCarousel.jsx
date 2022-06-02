import {useLayoutEffect, useState} from 'react';
import {nanoid} from 'nanoid';
import styled from '@emotion/styled';
import {Box, Typography, useMediaQuery, useTheme} from '@mui/material';

import {AiOutlineArrowRight} from 'react-icons/ai';

import Banner0 from 'assets/images/banner-0.png';
import Banner1 from 'assets/images/banner-1.png';
import {Link} from 'react-router-dom';
import Carousel from 'react-elastic-carousel';

const images = [
	{id: nanoid(2), image: Banner0, active: 'active'},
	{id: nanoid(2), image: Banner1, active: null},
];

export default function BannerCarousel() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const [carouselSize, setCarouselSize] = useState(400);

	useLayoutEffect(() => {
		if (matches) {
			setCarouselSize(300);
		} else {
			setCarouselSize(400);
		}
	}, [matches]);
	return (
		<BoxBannerCarouselWrapper>
			<Carousel enableAutoPlay autoPlaySpeed={3000}>
				{images.map(image => (
					<Box
						key={image.id}
						style={{
							height: `${carouselSize}px`,
							width: '100%',
							backgroundImage: `url(${image.image})`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: 'cover',
							backgroundPosition: 'center center',
							position: 'relative',
						}}>
						<BoxLinkShopNowStyled component={Link} to={`/shop`}>
							<Typography style={{display: 'inline-block', marginRight: '8px'}}>
								Shop now
							</Typography>
							<AiOutlineArrowRight />
						</BoxLinkShopNowStyled>
					</Box>
				))}
			</Carousel>

			{/* <BoxCarousel
				style={{height: `${carouselSize}px`, backgroundImage: `url(${image})`}}>
				<DotWrapper container>
					{images.map(item => (
						<Dot
							onClick={() => onClickDot(item.id)}
							className={item.active}
							key={item.id || Date.now()}
							item
						/>
					))}
				</DotWrapper>
				<BoxLinkShopNowStyled component={Link} to={`/shop`}>
					<Typography style={{display: 'inline-block', marginRight: '8px'}}>
						Shop now
					</Typography>
					<AiOutlineArrowRight />
				</BoxLinkShopNowStyled>
			</BoxCarousel> */}
		</BoxBannerCarouselWrapper>
	);
}

const BoxLinkShopNowStyled = styled(Box)`
	display: flex;
	align-items: center;

	position: absolute;
	bottom: 15vh;
	left: 5vw;

	color: #fff;
	background-color: #2bbef9;
	padding: 8px 20px;

	border-radius: 2.3rem;

	text-decoration: none;
`;

const BoxBannerCarouselWrapper = styled(Box)`
	position: relative;
	/* padding: 15px; */

	& .rec.rec-arrow {
		display: none;
	}

	& .rec.rec-pagination {
		position: absolute;
		bottom: 9vh;
		left: 7vw;

		& .rec.rec-dot {
			display: inline-block;
			width: 8px;
			height: 8px;
			background-color: #fff;
			margin: 0 6px;
			border-radius: 50%;
			opacity: 0.3;
			cursor: pointer;
			&.rec.rec-dot_active {
				position: relative;
				opacity: 1;
				&::after {
					position: absolute;
					content: '';
					width: 250%;
					height: 250%;
					top: 50%;
					left: 50%;
					border-radius: 50%;
					transform: translate(-50%, -50%);
					background-color: #fff;
					opacity: 0.3;
				}
			}
		}
	}
`;

// const BoxCarousel = styled(Box)`
// 	border-radius: 6px;
// 	position: relative;
// 	width: 100%;
// 	background-repeat: no-repeat;
// 	background-size: cover;
// 	background-position: center center;

// 	transition: 0.4s;
// `;

// const DotWrapper = styled.div`
// 	position: absolute;
// 	bottom: 5vh;

// 	left: 4vw;

// 	/* left: 50%;
// 	transform: translate(0, -50%); */
// `;

// const Dot = styled.span`
// 	display: inline-block;
// 	width: 8px;
// 	height: 8px;
// 	/* background-color: #202435; */
// 	background-color: #fff;
// 	margin: 0 6px;
// 	border-radius: 50%;
// 	opacity: 0.3;
// 	cursor: pointer;
// 	&.active {
// 		position: relative;
// 		opacity: 1;
// 		&::after {
// 			position: absolute;
// 			content: '';
// 			width: 250%;
// 			height: 250%;
// 			top: 50%;
// 			left: 50%;
// 			border-radius: 50%;
// 			transform: translate(-50%, -50%);
// 			background-color: #fff;
// 			opacity: 0.3;
// 		}
// 	}
// `;
