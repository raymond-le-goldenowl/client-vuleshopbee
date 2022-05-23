import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Button, Container} from '@mui/material';

import {toast} from 'react-toastify';
import {reset} from 'features/Auth/authSlice';
import {getProducts, loadMoreProducts} from 'features/Product/productSlice';

import RenderListProduct from 'components/RenderListProduct';

import {PER_PAGE} from './constants';

export function HomePage() {
	const dispatch = useDispatch();
	const {products} = useSelector(state => state.product);
	const {isError, message} = useSelector(state => state.auth);

	// get products with any rerender times
	useEffect(() => {
		dispatch(getProducts());
	}, []);

	// show error is has any error
	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(reset());
		}
	}, [isError]);

	// get more product if click load more at home page
	const onClickLoadMore = () => {
		const {page} = products;
		dispatch(loadMoreProducts({page: page + 1, PER_PAGE}));
	};

	return (
		<Container
			maxWidth='lg'
			sx={{
				marginTop: 2,
				display: {xs: 'flex'},
				flexDirection: {xs: 'column'},
				justifyContent: {xs: 'center'},
				alignItems: {xs: 'center'},
			}}>
			<RenderListProduct products={products.products} />

			{products?.perPage &&
			products?.products.length === PER_PAGE * products?.page &&
			products?.products.length !== 0 ? (
				<Box component='div' sx={{textAlign: 'center', marginTop: 2}}>
					<Button
						type='button'
						onClick={() => {
							onClickLoadMore();
						}}>
						Load more...
					</Button>
				</Box>
			) : null}
		</Container>
	);
}
