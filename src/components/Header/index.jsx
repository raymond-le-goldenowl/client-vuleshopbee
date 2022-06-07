import {Fragment, useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
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
import useDebounce from 'hooks/use-debounce.hook';
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

	const [checked, setChecked] = useState(false);

	// const [searchTerm, setSearchTerm] = useState('');
	const [choosePosition, setChoosePosition] = useState({
		left: false,
	});

	const {user} = useSelector(state => state.auth);
	const {cart} = useSelector(state => state.cart);
	const {orders} = useSelector(state => state.order);
	const categories = useSelector(getCategoriesSelector);
	// const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
	}, [navigate]);

	// for debounce search feature
	// useEffect(() => {
	// 	onSearch(debouncedSearchTerm);
	// }, [debouncedSearchTerm]);

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

		dispatch(searchProductByName());
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
				user={user}
			/>
		</Fragment>
	);
}

export default Header;
