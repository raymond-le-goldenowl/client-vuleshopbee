import {
	Badge,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';

import {ReactComponent as AppLogo2} from 'assets/logo/logo2.svg';
import {ReactComponent as AppLogo3} from 'assets/logo/logo3.svg';

import HeaderFormSearchDesktop from './HeaderFormSearchDesktop';
import RenderListAnchorMobile from './RenderListAnchorMobile';

import {AiOutlineUser} from 'react-icons/ai';
import {BsHandbag} from 'react-icons/bs';
import {GiHamburgerMenu} from 'react-icons/gi';

export default function MiddleHeader({
	toggleDrawer,
	user,
	orders,
	choosePosition,
	cart,
	setSearchTerm,
	onClickCategoriesButton,
	checked,
}) {
	return (
		<Container
			maxWidth='lg'
			sx={{padding: {xs: '0', sm: '0', md: '30px 0 0 0', overflow: 'none'}}}>
			<Grid container alignItems='center' justifyContent='space-between'>
				{/* Render list anchor */}
				<Grid
					item
					xs={4}
					sm={4}
					md={1}
					lg={1}
					xl={1}
					sx={{display: {xs: 'flex', md: 'flex', lg: 'none', xl: 'none'}}}>
					<Box sx={{flexGrow: 1}}>
						<Button
							size='small'
							arial-label='menu'
							onClick={toggleDrawer('left', true)}
							style={{fontSize: '2rem', backgroundColor: '#fff'}}>
							<GiHamburgerMenu size={20} color='#3e445a' />
						</Button>

						<RenderListAnchorMobile
							toggleDrawer={toggleDrawer}
							anchor={'left'}
							user={user}
							orders={orders}
							choosePosition={choosePosition}
							onClickCategoriesButton={onClickCategoriesButton}
							checked={checked}
						/>
					</Box>
				</Grid>

				{/* Logo 3 */}
				<Grid
					item
					xs={4}
					sm={4}
					md={2}
					lg={2}
					xl={2}
					textAlign='center'
					sx={{
						display: {xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block'},
					}}>
					<Button component={Link} to={`/`}>
						<AppLogo3 />
					</Button>
				</Grid>
				{/* Logo 2 */}
				<Grid
					item
					xs={4}
					sm={4}
					md={2}
					lg={2}
					xl={2}
					textAlign='center'
					sx={{
						display: {xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none'},
					}}>
					<Button style={{height: '60px'}} component={Link} to={`/`}>
						<AppLogo2 />
					</Button>
				</Grid>

				{/* Search */}
				<Grid
					item
					xs={4}
					sm={6}
					md={6}
					lg={8}
					xl={8}
					sx={{
						display: {xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex'},
					}}>
					<HeaderFormSearchDesktop onSearch={setSearchTerm} />
				</Grid>

				{/* Account and Cart */}
				<Grid
					item
					xs={4}
					sm={4}
					md={3}
					lg={2}
					xl={2}
					display='flex'
					justifyContent='flex-end'>
					<IconButtonAccountStyled
						component={Link}
						to={user ? `/account` : `/login`}
						aria-label='delete'
						size='small'
						sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}>
						<AiOutlineUser color='black' size={20} style={{boxSizing: 'initial'}} />
					</IconButtonAccountStyled>

					<ButtonCartClick
						disableRipple={true}
						component={Link}
						to={`/account/cart`}>
						<TypographyPriceCartStyled component='span'>
							$28.37
						</TypographyPriceCartStyled>
						<TypographyCartIconStyled
							disableRipple={true}
							size='small'
							sx={{marginRight: {xs: '20px', sm: '20px', md: '4px'}}}>
							<BadgeStyled badgeContent={cart?.total || 0} showZero={true}>
								<BsHandbag size={20} color='red' />
							</BadgeStyled>
						</TypographyCartIconStyled>
					</ButtonCartClick>
				</Grid>
			</Grid>
		</Container>
	);
}

const IconButtonAccountStyled = styled(IconButton)`
	background-color: #ffffff;
	font-size: 1.125rem;
	width: 2.625rem;
	height: 2.625rem;
	border: 1px solid #e2e4ec;
	border-radius: 50%;
`;

const TypographyPriceCartStyled = styled(Typography)`
	margin: 0 15px;
	margin-bottom: -2px;
`;

const TypographyCartIconStyled = styled(IconButton)`
	font-size: 1.125rem;
	width: 2.625rem;
	height: 2.625rem;
	border-radius: 50%;
	margin-top: -3px;
	background-color: #fff1ee;
	color: #ea2b0f;
`;

const BadgeStyled = styled(Badge)`
	& span.BaseBadge-badge.MuiBadge-badge {
		color: #fff;
		background-color: #ea2b0f;
		top: -3px;
		right: -2px;
	}
`;

const ButtonCartClick = styled(Button)`
	all: unset;
	display: inline-block;
	cursor: pointer;
`;
