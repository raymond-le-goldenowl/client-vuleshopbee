import {
	Badge,
	Box,
	Button,
	Drawer,
	Grid,
	Typography,
	Collapse,
} from '@mui/material';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import {Fragment} from 'react';

import {FiHome} from 'react-icons/fi';
import {MdCancel} from 'react-icons/md';
import {BiStoreAlt} from 'react-icons/bi';
import {GiBeveledStar} from 'react-icons/gi';
import {CgFileDocument} from 'react-icons/cg';
import {GiHamburgerMenu} from 'react-icons/gi';
import {RiArrowDropDownLine} from 'react-icons/ri';

import {ReactComponent as AppLogo2} from 'assets/logo/logo2.svg';

function RenderListAnchorMobile({
	toggleDrawer,
	anchor,
	user,
	orders,
	choosePosition,
	onClickCategoriesButton,
	checked,
	categories,
}) {
	return (
		<Fragment key={'left'}>
			<DrawerStyled
				anchor={'left'}
				open={choosePosition['left']}
				onClose={toggleDrawer('left', false)}>
				<Box
					width='100%'
					role='presentation'
					onKeyDown={toggleDrawer(anchor, false)}
					display='flex'
					flexDirection='column'>
					<Grid
						container
						padding='1.875rem 1.875rem 0.625rem;'
						alignItems='center'
						justifyContent='space-between'>
						<Grid item>
							<Button style={{height: '80px'}} component={Link} to={`/`}>
								<AppLogo2 />
							</Button>
						</Grid>
						<Grid item>
							<MdCancel
								color='#c2c2d3'
								size={28}
								onClick={toggleDrawer(anchor, false)}
							/>
						</Grid>
					</Grid>

					<ButtonOpenCategoriesStyled
						disableTouchRipple={true}
						onClick={onClickCategoriesButton}>
						<GiHamburgerMenu />
						<Typography
							component='p'
							marginLeft='15px'
							fontSize='0.9375rem'
							fontWeight='600'>
							All Categories
						</Typography>

						<RiArrowDropDownLine size={30} style={{marginLeft: '36px'}} />
					</ButtonOpenCategoriesStyled>

					{categories && (
						<GridContainerCategoriesMobile container>
							<Collapse in={checked}>
								{categories.map(category => (
									<GridItemCategoryMobile item key={category?.id}>
										<GiBeveledStar />
										<SpanCategoryTextStyled component='span'>
											{category?.text}
										</SpanCategoryTextStyled>
									</GridItemCategoryMobile>
								))}
							</Collapse>
						</GridContainerCategoriesMobile>
					)}

					{/* Site navigation */}
					<ButtonLinkStyled component={Link} to={`/`}>
						<FiHome size={20} style={{marginRight: '0.4375rem', flex: 1}} />
						<Typography component='span' flex={10}>
							Home
						</Typography>
					</ButtonLinkStyled>
					<ButtonLinkStyled component={Link} to={`/shop`}>
						<BiStoreAlt size={20} style={{marginRight: '0.4375rem', flex: 1}} />
						<Typography component='span' flex={10}>
							Shop
						</Typography>
					</ButtonLinkStyled>

					{user && (
						<ButtonLinkStyled component={Link} to={'/account/order'}>
							<CgFileDocument
								fontSize={20}
								style={{marginRight: '0.4375rem', flex: 1}}
							/>
							<Typography component='span' flex={10}>
								<Badge badgeContent={orders.length || 0} color='error'>
									Order Received
								</Badge>
							</Typography>
						</ButtonLinkStyled>
					)}

					<Typography
						component='p'
						style={{
							color: '#9b9bb4',
							fontSize: '12px',
							padding: '30px 30px 0px',
						}}>
						Copyright 2022 © ...
					</Typography>
				</Box>
			</DrawerStyled>
		</Fragment>
	);
}

const DrawerStyled = styled(Drawer)`
	& .MuiPaper-root.MuiPaper-elevation {
		width: 400px;
	}
`;

const ButtonLinkStyled = styled(Button)`
	font-family: 'Dosis', sans-serif !important;
	font-size: 15px;
	line-height: 1;
	height: 2.5rem;
	color: #3e445a;
	font-weight: 600;
	letter-spacing: 0;
	padding: 0 1.125rem;
	border-radius: 2.5rem;
	text-transform: uppercase;

	display: flex;

	&:hover {
		color: #2bbef9;
		background-color: #f0faff;
	}
`;

const ButtonOpenCategoriesStyled = styled(Button)`
	& * {
		font-family: 'Dosis', sans-serif !important;
	}
	width: 90%;
	margin: auto;
	color: #fff;
	background-color: #2bbef9;
	line-height: 1;
	font-weight: 600;
	letter-spacing: 0;
	padding: 0 1.125rem;
	height: 3.125rem;
	border-radius: 0.5rem;
	text-transform: uppercase;
	position: relative;
	display: flex;
	justify-content: space-between;

	&:hover {
		background-color: #2bbef9;
	}
`;

const GridContainerCategoriesMobile = styled(Grid)`
	flex-direction: column;
	color: #000;
	background-color: #fff;
`;

const GridItemCategoryMobile = styled(Grid)`
	width: 100%;
	text-align: left;
	padding: 0.4375rem 1.5625rem;
	cursor: pointer;
	font-size: 13px;
	color: #3e445a;
	line-height: 2;
	text-transform: initial;
	& * {
		margin: 0 8px;
	}
	&:hover {
		color: #2bbef9;
	}
`;

const SpanCategoryTextStyled = styled(Typography)`
	display: inline-block;
	&::first-letter {
		text-transform: capitalize;
	}
`;

export default RenderListAnchorMobile;
