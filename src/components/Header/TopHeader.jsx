import styled from '@emotion/styled';
import {Box, Container, Divider, Grid, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

function TopHeader() {
	return (
		<>
			<TypographyTopCaptionStyled component='div'>
				Due to the{' '}
				<Typography component='strong' fontWeight='bold' style={{fontSize: '12px'}}>
					{' '}
					COVID 19{' '}
				</Typography>
				epidemic, orders may be processed with a slight delay
			</TypographyTopCaptionStyled>
			<Container maxWidth='lg' sx={{padding: {xs: '0', sm: '0', md: '9.5px 0'}}}>
				<Grid
					container
					sx={{display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'}}}>
					<Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
						<TypographyLinkStyled component={Link} to={'/about-us'}>
							About us
						</TypographyLinkStyled>
						<TypographyLinkStyled component={Link} to={'/account'}>
							My account
						</TypographyLinkStyled>
					</Grid>

					<Grid item xs={7} sm={7} md={7} lg={7} xl={7} style={{textAlign: 'right'}}>
						<TypographSecureDeliveryStyled component='p'>
							100% Secure delivery without contacting the courier
						</TypographSecureDeliveryStyled>

						<BoxCallUsStyled item xs={4} sm={4} md={4} lg={4} xl={4}>
							<TypographyCallUsStyled component='p'>
								Need help? Call Us:{' '}
								<TypographyPhoneCallUsStyled component='a' href='tel:84333124198'>
									+84333124198
								</TypographyPhoneCallUsStyled>
							</TypographyCallUsStyled>
						</BoxCallUsStyled>
					</Grid>
				</Grid>
			</Container>
			<Divider sx={{display: {xs: 'none', sm: 'none', md: 'none', lg: 'block'}}} />
		</>
	);
}

const TypographyLinkStyled = styled(Typography)`
	text-decoration: none;
	font-size: 12px;
	color: #3e445a;
	margin-left: 0.9375rem;
`;

const TypographSecureDeliveryStyled = styled(Typography)`
	display: inline-block;
	font-size: 12px;
	color: #3e445a;
`;

const TypographyCallUsStyled = styled(Typography)`
	font-size: 12px;
	color: #3e445a;
`;

const TypographyPhoneCallUsStyled = styled(Typography)`
	display: inline-block;
	color: #2bbef9;
	font-size: 12px;
	font-weight: bolder;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

const BoxCallUsStyled = styled(Box)`
	display: inline-block;
	text-align: right;
	border-left: 1px solid #d9d9d996;
	padding-left: 18px;
	margin-left: 18px;
`;

const TypographyTopCaptionStyled = styled(Typography)`
	text-align: center;
	font-size: 12px;
	background-color: #233a95;
	color: #fff;
	padding: 9px 15px;
`;

export default TopHeader;
