import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Button, Container} from '@mui/material';

import RenderListProduct from 'components/RenderListProduct';

import {getProducts, loadMoreProducts} from 'features/Product/productSlice';
import {toast} from 'react-toastify';
import {reset} from 'features/Auth/authSlice';

function Home() {
	const perPage = 8;
	const dispatch = useDispatch();
	const {products} = useSelector(state => state.product);
	const {isError, message} = useSelector(state => state.auth);
	useEffect(() => {
		dispatch(getProducts());
	}, []);

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

	const onClickLoadMore = () => {
		const {page} = products;
		dispatch(loadMoreProducts({page: page + 1, perPage}));
	};
	return (
		<Container maxWidth='lg' sx={{marginTop: 2}}>
			<RenderListProduct products={products.products} />

			{products?.perPage &&
			products?.products.length === perPage &&
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

export default Home;
