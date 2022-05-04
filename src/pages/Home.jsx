import Header from 'components/Header';
import {getProducts, loadMoreProducts} from 'containers/Product/productSlice';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RenderListProduct from 'components/RenderListProduct';
import {Box, Button, Container} from '@mui/material';
function Home() {
	const perPage = 8;
	const dispatch = useDispatch();

	const {products} = useSelector(state => state.product);

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	const onClickLoadMore = () => {
		const {page} = products;
		dispatch(loadMoreProducts({page: page + 1, products}));
	};
	return (
		<div className='app-vuleshopbee'>
			<Header />
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
		</div>
	);
}

export default Home;
