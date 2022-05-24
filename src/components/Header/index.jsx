import {Fragment, useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
	searchProductByName,
	setSearchValue,
} from 'features/Product/productSlice';
import {getCart} from 'features/Cart/cartSlice';
import {getOrders} from 'features/Order/orderSlice';
import {getProfile, logout, reset} from 'features/Auth/authSlice';
import useDebounce from 'hooks/use-debounce';
import TopHeader from './TopHeader';
import MiddleHeader from './MiddleHeader';
import BottomHeader from './BottomHeader';
import AppBarFixedAtBottom from './AppBarFixedAtBottom';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [checked, setChecked] = useState(false);

	const [searchTerm, setSearchTerm] = useState('');
	const [choosePosition, setChoosePosition] = useState({
		left: false,
	});

	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);
	const {orders} = useSelector(state => state.order);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	// profile and order values while rendering
	useEffect(() => {
		dispatch(getProfile());
		dispatch(getOrders());
	}, []);

	// if navigate change should get new cart value
	useEffect(() => {
		dispatch(getCart());
		if (choosePosition) {
			setChoosePosition(false);
		}
	}, [navigate]);

	// for debounce search feature
	useEffect(() => {
		onSearch(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const onClickCategoriesButton = () => {
		setChecked(prev => !prev);
	};

	// toggleDrawer for mobile navbar.
	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		//to close nav of categorires mobile template
		if (open === false) {
			setChecked(false);
		}
		setChoosePosition({...choosePosition, [anchor]: open});
	};

	const onSearch = value => {
		dispatch(setSearchValue(value));
		dispatch(searchProductByName(value));
	};

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/login');
	};

	return (
		<Fragment>
			<TopHeader />
			<MiddleHeader
				toggleDrawer={toggleDrawer}
				user={user}
				orders={orders}
				choosePosition={choosePosition}
				cart={cart}
				setSearchTerm={setSearchTerm}
				onClickCategoriesButton={onClickCategoriesButton}
				checked={checked}
			/>
			<BottomHeader />
			<AppBarFixedAtBottom
				onClickCategoriesButton={onClickCategoriesButton}
				toggleDrawer={toggleDrawer}
				setSearchTerm={setSearchTerm}
			/>
		</Fragment>
	);
}

export default Header;
