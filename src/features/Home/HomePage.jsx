import {Container, Grid} from '@mui/material';
import HomeMain from './HomeMain';
import HomeAside from './HomeAside';
import BannerCarousel from './BannerCarousel';
import BestSeller from './BestSeller';
import NewProducts from './NewProducts';

export function HomePage() {
	return (
		<Container maxWidth='lg'>
			<Grid container>
				{/* create space for home page */}
				<HomeAside></HomeAside>
				<HomeMain>
					{/* Banner */}
					<BannerCarousel />
				</HomeMain>
			</Grid>

			{/* Best Seller */}
			<BestSeller />

			{/* New products */}
			<NewProducts />
		</Container>
	);
}
