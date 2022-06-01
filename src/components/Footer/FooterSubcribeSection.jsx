import styled from '@emotion/styled';
import {Box, Container, Grid, Typography} from '@mui/material';

import DisplayImage from 'components/DisplayImage';

import coupon from 'assets/images/coupon.png';
import TextFieldSubcribe from './TextFieldSubcribe';

export default function FooterSubcribeSection() {
	return (
		<BoxFooterSubcribeSection component='section' marginY>
			<Container maxWidth='lg'>
				<Grid container>
					<Grid item xs={12} sm={12} md={12} lg={5} xl={5} padding='4.375rem 0'>
						<Typography variant='h5' fontWeight='bolder'>
							Join our newsletter and get...
						</Typography>
						<Typography
							variant='caption'
							component='p'
							color='#e4e5ee'
							width='300px'
							margin='25px 0'>
							Join our email subscription now to get updates on promotions and coupons.
						</Typography>

						<TextFieldSubcribe />
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={7}
						xl={7}
						display='flex'
						alignItems='flex-end'
						sx={{
							justifyContent: {
								xs: 'center',
								sm: 'center',
								md: 'center',
								lg: 'flex-end',
								xl: 'flex-end',
							},
						}}>
						<DisplayImage image={coupon} style={{maxWidth: '100%', height: 'auto'}} />
					</Grid>
				</Grid>
			</Container>
		</BoxFooterSubcribeSection>
	);
}

const BoxFooterSubcribeSection = styled(Box)`
	color: #fff;
	background-color: #233a95;
`;
