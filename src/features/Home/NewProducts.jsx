import {Box, Button, Grid, Typography} from '@mui/material';
import HomeMain from './HomeMain';
import HomeAside from './HomeAside';
import RenderListProduct from 'components/RenderListProduct';
import {useDispatch, useSelector} from 'react-redux';
import HBannerImageNetflix from 'assets/images/horizontal-banner-netflix-0.png';
import DisplayImage from 'components/DisplayImage';
import {PER_PAGE} from './constants';
import {loadMoreProducts} from 'features/Product/productSlice';

export default function NewProducts() {
	const dispatch = useDispatch();
	const {products} = useSelector(state => state.product);
	// get more product if click load more at home page
	const onClickLoadMore = () => {
		const {page} = products;
		dispatch(loadMoreProducts({page: page + 1, PER_PAGE}));
	};

	if (products.length === 0) return null;

	return (
		<Grid container>
			<HomeAside>
				<Box sx={{display: {xs: 'none', ms: 'none', md: 'block'}}}>
					<DisplayImage
						image={HBannerImageNetflix}
						style={{width: '100%', boxSizing: 'border-box', padding: '20px'}}
					/>
				</Box>
			</HomeAside>
			<HomeMain>
				{/* Best Seller */}
				<Box component='header'>
					<Typography
						component='h4'
						style={{textTransform: 'uppercase', fontWeight: 500}}>
						NEW PRODUCTS
					</Typography>
					<Typography variant='caption'>
						New products with updated stocks.
					</Typography>
				</Box>
				<Box>
					<RenderListProduct products={products?.products} />
				</Box>
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
			</HomeMain>
		</Grid>
	);
}
