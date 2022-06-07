import {Box, Button, Grid, Typography} from '@mui/material';
import HomeMain from './HomeMain';
import HomeAside from './HomeAside';
import RenderListProduct from 'components/RenderListProduct';
import {useSelector} from 'react-redux';
import HBannerImageNetflix from 'assets/images/horizontal-banner-netflix-0.png';
import DisplayImage from 'components/DisplayImage';
import {PER_PAGE} from './constants';
import {selectAllProducts} from 'features/Product/productSlice';
import {Link} from 'react-router-dom';

export default function NewProducts() {
	const {products} = useSelector(selectAllProducts);

	if (products?.length === 0) return null;

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
				<Box
					component='header'
					style={{display: 'flex', justifyContent: 'space-between'}}>
					<Box>
						<Typography
							component='h4'
							style={{textTransform: 'uppercase', fontWeight: 500}}>
							NEW PRODUCTS
						</Typography>
						<Typography variant='caption'>
							New products with updated stocks.
						</Typography>
					</Box>

					<Button component={Link} to={`/shop`}>
						View All
					</Button>
				</Box>
				<Box>
					<RenderListProduct products={products} />
				</Box>
			</HomeMain>
		</Grid>
	);
}
