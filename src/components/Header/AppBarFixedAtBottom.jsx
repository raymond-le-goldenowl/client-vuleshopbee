import {useState} from 'react';
import styled from '@emotion/styled';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';

import {FiSearch, FiFilter} from 'react-icons/fi';
import {IoHome} from 'react-icons/io5';
import {BiStoreAlt} from 'react-icons/bi';
import {AiOutlineUser} from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi';
import HeaderFormSearchMobile from './HeaderFormSearchMobile';

export default function AppBarFixedAtBottom({
	onClickCategoriesButton,
	toggleDrawer,
	setSearchTerm,
	user,
}) {
	const location = useLocation();
	const [isMobileSearch, setIsMobileSearch] = useState(false);

	const regex =
		/\/product\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/g;
	const found = location.pathname.match(regex);
	if (found) return <></>;
	return (
		<AppBarFixedAtBottomStyled
			position='fixed'
			color='primary'
			sx={{
				top: 'auto',
				bottom: 0,
				display: {xs: 'block', sm: 'block', md: 'none'},
			}}>
			{/* Form search */}
			<HeaderFormSearchMobile
				isMobileSearch={isMobileSearch}
				onSearch={setSearchTerm}
			/>

			<ToolbarFixedAtBottomStyled>
				{/* render if it was homepage */}
				{location.pathname === '/' && (
					<>
						<IconButtonFixedAtBottomStyled
							disableRipple={true}
							component={Link}
							to={'/shop'}
							color='inherit'
							style={{display: 'flex', flexDirection: 'column'}}>
							<BiStoreAlt size={20} />
							<Typography component='span'>Store</Typography>
						</IconButtonFixedAtBottomStyled>
					</>
				)}

				{/* render if it was shop-page */}
				{location.pathname === '/shop' && (
					<>
						<IconButtonFixedAtBottomStyled
							disableRipple={true}
							component={Link}
							to={'/'}
							color='inherit'
							style={{display: 'flex', flexDirection: 'column'}}>
							<IoHome size={20} />
							<Typography component='span'>Home</Typography>
						</IconButtonFixedAtBottomStyled>
						<IconButtonFixedAtBottomStyled
							disableRipple={true}
							component={Link}
							to={'#'}
							color='inherit'
							style={{display: 'flex', flexDirection: 'column'}}>
							<FiFilter size={20} />
							<Typography component='span'>Filter</Typography>
						</IconButtonFixedAtBottomStyled>
					</>
				)}

				<IconButtonFixedAtBottomStyled
					onClick={() => setIsMobileSearch(prev => !prev)}
					disableRipple={true}
					// component={Link}
					// to={'#'}
					color='inherit'
					style={{display: 'flex', flexDirection: 'column'}}>
					<FiSearch size={20} />
					<Typography component='span'>search</Typography>
				</IconButtonFixedAtBottomStyled>

				<IconButtonFixedAtBottomStyled
					disableRipple={true}
					component={Link}
					to={user ? `/account` : `/login`}
					color='inherit'
					style={{display: 'flex', flexDirection: 'column'}}>
					<AiOutlineUser size={20} />
					<Typography component='span'>Account</Typography>
				</IconButtonFixedAtBottomStyled>

				{/* render if it was homepage */}
				{location.pathname === '/' && (
					<IconButtonFixedAtBottomStyled
						onClick={event => {
							onClickCategoriesButton();
							toggleDrawer('left', true)(event);
						}}
						disableRipple={true}
						color='inherit'
						style={{display: 'flex', flexDirection: 'column'}}>
						<GiHamburgerMenu size={20} />
						<Typography component='span'>Categories</Typography>
					</IconButtonFixedAtBottomStyled>
				)}
			</ToolbarFixedAtBottomStyled>
		</AppBarFixedAtBottomStyled>
	);
}

const IconButtonFixedAtBottomStyled = styled(IconButton)`
	&:hover {
		background-color: unset;
	}
`;

const ToolbarFixedAtBottomStyled = styled(Toolbar)`
	justify-content: space-between;
	box-shadow: 0 -2px 5px rgb(0 0 0 / 7%);
	& *,
	& a {
		font-size: 10px !important;
		color: #a7a7b5;
	}
`;

const AppBarFixedAtBottomStyled = styled(AppBar)`
	background-color: #fff;
`;
