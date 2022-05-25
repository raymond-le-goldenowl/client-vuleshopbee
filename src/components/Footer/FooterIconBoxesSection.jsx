import styled from '@emotion/styled';
import {Box, Container, Grid, Typography} from '@mui/material';

import {FaAirFreshener} from 'react-icons/fa';
import {RiCaravanLine} from 'react-icons/ri';
import {AiOutlineDollarCircle, AiOutlinePercentage} from 'react-icons/ai';

export default function FooterIconBoxesSection() {
	return (
		<BoxIconBoxes
			component='section'
			sx={{padding: {xs: '20px 0', sm: '20px 0'}, backgroundColor: '#f7f8fd'}}>
			<Container>
				<Grid container>
					<GridIconBox
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						xl={3}
						sx={{
							justifyContent: {xs: 'flex-start', sm: 'flex-start'},
						}}>
						<FaAirFreshener size={22} style={{marginRight: 10}} />
						<Typography component='p'>Everyday fresh products</Typography>
					</GridIconBox>
					<GridIconBox
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						xl={3}
						sx={{
							justifyContent: {xs: 'flex-start', sm: 'flex-start'},
						}}>
						<RiCaravanLine size={22} style={{marginRight: 10}} />
						<Typography component='p'>Free delivery for order over $70</Typography>
					</GridIconBox>
					<GridIconBox
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						xl={3}
						sx={{
							justifyContent: {xs: 'flex-start', sm: 'flex-start'},
						}}>
						<AiOutlinePercentage size={22} style={{marginRight: 10}} />
						<Typography component='p'>Daily Mega Discounts</Typography>
					</GridIconBox>
					<GridIconBox
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						xl={3}
						sx={{
							justifyContent: {xs: 'flex-start', sm: 'flex-start'},
						}}>
						<AiOutlineDollarCircle size={22} style={{marginRight: 10}} />
						<Typography component='p'>Best price on the market</Typography>
					</GridIconBox>
				</Grid>
			</Container>
		</BoxIconBoxes>
	);
}

const GridIconBox = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;

	& p {
		font-size: 13px;
		font-weight: 500;
		line-height: 2.2rem;
	}
`;

const BoxIconBoxes = styled(Box)`
	padding: 35px 0;
`;
