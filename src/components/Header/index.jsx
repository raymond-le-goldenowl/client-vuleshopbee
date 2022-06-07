import {Fragment, useEffect, useState} from 'react';

import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
	getProducts,
	getProductsByIds,
	searchProductByName,
	setSearchValue,
} from 'features/Product/productSlice';
import {getCart} from 'features/Cart/cartSlice';
import {getOrders} from 'features/Order/orderSlice';
import {getProfile} from 'features/Auth/authSlice';
import TopHeader from './TopHeader';
import MiddleHeader from './MiddleHeader';
import BottomHeader from './BottomHeader';
import AppBarFixedAtBottom from './AppBarFixedAtBottom';
import {getCartLocal} from 'features/Cart/cartService';
import {
	getCategories,
	getCategoriesSelector,
} from 'features/Categories/categoriesSlice';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const location = useLocation();

	const [checked, setChecked] = useState(false);

	const [choosePosition, setChoosePosition] = useState({
		left: false,
	});

	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);
	const {orders} = useSelector(state => state.order);
	const categories = useSelector(getCategoriesSelector);

	// profile and order values while rendering
	useEffect(() => {
		dispatch(getCategories());
	}, []);

	// if navigate change should get new cart value
	useEffect(() => {
		dispatch(getOrders());
		dispatch(getProfile());
		dispatch(getCart());
		dispatch(getProducts());

		const cartItemsLocal = getCartLocal();
		const ids = cartItemsLocal.map(item => item?.productId || '');
		dispatch(getProductsByIds({ids}));
		if (choosePosition) {
			setChoosePosition(false);
		}

		if (location.pathname === '/shop') {
			console.log(searchParams.get('category'));
		}
	}, [navigate]);

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
	};

	const onSubmitSearchProduct = event => {
		event.preventDefault();

		// get product by search value
		dispatch(searchProductByName());
		// set empty for search value
		dispatch(setSearchValue(''));
		event?.target?.reset();

		// change to shop page
		navigate(`/shop`);
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
				onSearch={onSearch}
				onSubmitSearchProduct={onSubmitSearchProduct}
				onClickCategoriesButton={onClickCategoriesButton}
				checked={checked}
				categories={categories}
			/>
			<BottomHeader categories={categories} />
			<AppBarFixedAtBottom
				onClickCategoriesButton={onClickCategoriesButton}
				toggleDrawer={toggleDrawer}
				onSearch={onSearch}
				onSubmitSearchProduct={onSubmitSearchProduct}
				user={user}
			/>
		</Fragment>
	);
}

export default Header;
