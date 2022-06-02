import styled from '@emotion/styled';
import {
	Badge,
	Button,
	Chip,
	Collapse,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import {FiHome} from 'react-icons/fi';
import {BiStoreAlt} from 'react-icons/bi';
import {GiHamburgerMenu} from 'react-icons/gi';
import {RiArrowDropDownLine} from 'react-icons/ri';
import {GiBeveledStar} from 'react-icons/gi';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {CgFileDocument} from 'react-icons/cg';

export default function BottomHeader({categories}) {
	const [checked, setChecked] = useState(false);
	const location = useLocation();
	const {user} = useSelector(state => state.auth);
	const {orders} = useSelector(state => state.order);

	useEffect(() => {
		if (location.pathname === '/') {
			setChecked(true);
		} else {
			setChecked(false);
		}
	}, [location]);
	const onClickCategoriesButton = () => {
		setChecked(prev => !prev);
	};

	return (
		<>
			<Container
				maxWidth='lg'
				sx={{
					padding: {xs: '0', sm: '0', md: '30px 0 20px 0'},
					display: {xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block'},
				}}>
				<Grid container>
					<Grid
						item
						xs={4}
						sm={4}
						md={4}
						lg={4}
						xl={4}
						display='flex'
						alignItems='center'>
						<ButtonCategoriesStyled
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
							<ChipStyled label='Chip Filled' />

							<RiArrowDropDownLine size={30} style={{marginLeft: '25px'}} />

							{categories && (
								<GridAbsoluteCategories container>
									<Collapse in={checked}>
										{categories.map(category => (
											<GridItemCategoryStyled key={category?.id} item>
												<GiBeveledStar />
												<TypographyCategoryTextStyled component='span'>
													{category?.text}
												</TypographyCategoryTextStyled>
											</GridItemCategoryStyled>
										))}
									</Collapse>
								</GridAbsoluteCategories>
							)}
						</ButtonCategoriesStyled>
					</Grid>

					<GridLinksStyled item xs={8} sm={8} md={8} lg={8} xl={8}>
						<ButtonLinkStyled component={Link} to={`/`}>
							<FiHome size={20} style={{marginRight: '0.4375rem'}} />
							Home
						</ButtonLinkStyled>
						<ButtonLinkStyled component={Link} to={`/shop`}>
							<BiStoreAlt size={20} style={{marginRight: '0.4375rem'}} />
							Shop
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
					</GridLinksStyled>
				</Grid>
			</Container>
			<Divider />
		</>
	);
}

const GridLinksStyled = styled(Grid)`
	display: flex;
	justify-content: flex-end;
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

	&:hover {
		color: #2bbef9;
		background-color: #f0faff;
	}
`;

const ButtonCategoriesStyled = styled(Button)`
	& * {
		font-family: 'Dosis', sans-serif !important;
	}
	line-height: 1;
	color: #fff;
	background-color: #2bbef9;
	font-weight: 600;
	letter-spacing: 0;
	padding: 0 1.125rem;
	height: 3.125rem;
	border-radius: 2.5rem;
	text-transform: uppercase;
	position: relative;

	&:hover {
		background-color: #2bbef9;
	}
`;

const GridAbsoluteCategories = styled(Grid)`
	flex-direction: column;
	position: absolute;
	top: 4.4rem;
	left: 0;
	right: 0;
	color: #000;
	z-index: 3;
	background-color: #fff;
`;

const GridItemCategoryStyled = styled(Grid)`
	width: 100%;
	text-align: left;
	padding: 0.4375rem 0 0.4375rem 1rem;
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

const TypographyCategoryTextStyled = styled(Typography)`
	display: inline-block;
	&::first-letter {
		text-transform: capitalize;
	}
`;
const ChipStyled = styled(Chip)`
	position: absolute;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	font-size: 0.625rem;
	letter-spacing: 0;
	text-transform: uppercase;
	white-space: nowrap;
	height: 1.125rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	color: #71778e;
	background-color: #edeef5;
	border: 1px solid #fff;
	border-radius: 1.125rem;
	bottom: -0.5rem;
	margin-left: 1.125rem;
`;
