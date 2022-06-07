import {Box, Container, Button} from '@mui/material';
import RenderListProduct from 'components/RenderListProduct';
import {PER_PAGE} from 'features/Home/constants';
import {
	loadMoreProducts,
	selectAllProducts,
} from 'features/Product/productSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function ShopPage() {
	const dispatch = useDispatch();
	const {products, page, perPage} = useSelector(selectAllProducts);
	console.log(
		'🚀 ~ file: ShopPage.jsx ~ line 13 ~ ShopPage ~ products, page, perPage',
		products,
		page,
		perPage,
	);

	// get more product if click load more at home page
	const onClickLoadMore = () => {
		dispatch(loadMoreProducts({page: page + 1, PER_PAGE}));
	};

	if (products?.length === 0) return null;

	return (
		<Container maxWidth='lg'>
			<RenderListProduct products={products} />

			{perPage && products.length === PER_PAGE * page && products.length !== 0 ? (
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
