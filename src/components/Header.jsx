import React, {useEffect} from 'react';

import {
	Box,
	Button,
	Drawer,
	AppBar,
	Toolbar,
	InputBase,
	Badge,
	IconButton,
} from '@mui/material';

import {styled, alpha} from '@mui/material/styles';
import ProfileAvatar from 'components/ProfileAvatar';
import {getProfile, logout, reset} from 'containers/Auth/authSlice';
import {BASE_SERVER_URL} from 'config/base-url';

import {MdSearch} from 'react-icons/md';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineShoppingCart} from 'react-icons/ai';

import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {
	searchProductByName,
	setSearchValue,
} from 'containers/Product/productSlice';
import {getCart} from 'containers/Cart/cartSlice';
import AccountMenu from 'components/AccountMenu';

const pages = [
	{id: 'home', text: 'Home'},
	{id: 'order-history', text: 'Order History'},
	{id: 'account', text: 'Account'},
];

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {user, isError} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);

	const [state, setState] = React.useState({
		left: false,
	});

	useEffect(() => {
		dispatch(getCart());
	}, []);

	useEffect(() => {
		// if get profile not working will be fail and logout
		if (!isError && user) {
			dispatch(getProfile(user));
		}

		if (!user) {
			navigate('/login');
		}
	}, [isError]);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({...state, [anchor]: open});
	};

	const list = anchor => {
		if (anchor) {
			return (
				<Box
					role='presentation'
					onClick={toggleDrawer(anchor, false)}
					onKeyDown={toggleDrawer(anchor, false)}
					display='flex'
					flexDirection='column'>
					<Box
						sx={{
							flexGrow: 0,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<ProfileAvatar
							user={user || {}}
							imageString={`${BASE_SERVER_URL}/users/image/avatar/${user?.avatar}`}
						/>
						<Button
							color='inherit'
							type='button'
							onClick={onLogout}
							sx={{margin: '0 10px'}}>
							Logout
						</Button>
					</Box>
					{pages.map(item => {
						return <Button key={item.id}>{item.value}</Button>;
					})}
				</Box>
			);
		} else {
			return (
				<Box>
					{pages.map(item => {
						return (
							<Button key={item.id} sx={{color: '#fff'}}>
								{item.text}
							</Button>
						);
					})}
				</Box>
			);
		}
	};

	const onSearch = ({target}) => {
		const value = target.value;
		dispatch(setSearchValue(value));
		dispatch(searchProductByName(value));
	};

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
	};

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position='static'>
				<Toolbar>
					<Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
						<Button
							size='small'
							arial-label='menu'
							onClick={toggleDrawer('left', true)}
							style={{fontSize: '2rem', backgroundColor: '#fff'}}>
							<GiHamburgerMenu />
						</Button>

						<React.Fragment key={'left'}>
							<Drawer
								anchor={'left'}
								open={state['left']}
								onClose={toggleDrawer('left', false)}>
								{list('left')}
							</Drawer>
						</React.Fragment>
					</Box>

					<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>{list()}</Box>

					<Box variant='h6' component='div' sx={{flexGrow: 1, margin: '0 10px'}}>
						<Search>
							<SearchIconWrapper>
								<MdSearch />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder='Search…'
								inputProps={{'aria-label': 'search'}}
								onChange={onSearch}
							/>
						</Search>
					</Box>

					<Box
						component='div'
						sx={{
							flexGrow: 0,
							display: {
								xs: 'none',
								md: 'flex',
							},
							alignItems: 'cener',
							margin: '0 10px',
						}}>
						<AccountMenu onLogout={onLogout} user={user} />
					</Box>

					<Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center'}}>
						<IconButton
							size='large'
							aria-label='Show total of item in cart'
							color='inherit'
							component={Link}
							to={'/cart'}>
							<Badge badgeContent={cart?.total || 0} color='error'>
								<AiOutlineShoppingCart />
							</Badge>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

Header.propTypes = {};

export default Header;
