import styled from '@emotion/styled';
import {Box, Container, Grid, IconButton, Typography} from '@mui/material';
import React from 'react';
import {FiPhoneCall} from 'react-icons/fi';
import {GrFacebookOption} from 'react-icons/gr';
import {BsTwitter} from 'react-icons/bs';
import {FiInstagram} from 'react-icons/fi';
import {ReactComponent as GooglePlay} from 'assets/images/google-play.svg';
import {ReactComponent as AppStore} from 'assets/images/app-store.svg';

export default function FooterContactSection() {
	return (
		<Box component='section' padding='2.875rem 0 2.875rem 0'>
			<Container maxWidth='lg'>
				<Grid container>
					<Grid
						item
						xl={6}
						lg={6}
						md={6}
						sm={12}
						xs={12}
						sx={{
							display: 'flex',
							justifyContent: {
								xl: 'inherit',
								lg: 'inherit',
								md: 'center',
								sm: 'center',
								xs: 'inherit',
							},
							margin: {
								xl: 'inherit',
								lg: 'inherit',
								md: '10px 0',
								sm: '10px 0',
								xs: '10px 0',
							},
						}}>
						<FooterContactSectionBoxLeftStyled>
							<IconButtonFiPhoneCallStyled>
								<FiPhoneCall />
							</IconButtonFiPhoneCallStyled>
							<Box>
								<TypographyPhoneNumberStyled component='p'>
									8 800 555-55
								</TypographyPhoneNumberStyled>
								<TypographyCaptionStoreOpenTime component='p' variant='caption'>
									Working 8:00 - 22:00
								</TypographyCaptionStoreOpenTime>
							</Box>
						</FooterContactSectionBoxLeftStyled>
					</Grid>
					<Grid item xl={6} lg={6} md={6} sm={12} xs={12} container>
						{/* Store Apps */}
						<Grid
							item
							xl={10}
							lg={10}
							md={12}
							sm={12}
							xs={12}
							container
							sx={{
								justifyContent: {
									xl: 'inherit',
									lg: 'inherit',
									md: 'center',
									sm: 'center',
									xs: 'inherit',
								},
							}}>
							<Grid
								item
								xl={6}
								lg={6}
								md={12}
								sm={12}
								xs={12}
								minWidth={220}
								sx={{
									margin: {
										xl: 'inherit',
										lg: 'inherit',
										md: '10px 0',
										sm: '10px 0',
										xs: '10px 0',
									},
									textAlign: {
										xs: 'left',
										sm: 'center',
										md: 'center',
										lg: 'center',
										xl: 'center',
									},
									color: '#202435',
								}}>
								<Typography
									style={{
										fontSize: '14px',
										fontWeight: 600,
									}}>
									Download App on Mobile :
								</Typography>
								<Typography
									style={{
										fontSize: '12px',
										opacity: 0.5,
									}}>
									15% discount on your first purchase
								</Typography>
							</Grid>
							<Grid
								item
								xl={6}
								lg={6}
								md={12}
								sm={12}
								xs={12}
								minWidth={220}
								sx={{
									display: 'flex',
									justifyContent: {
										xl: 'inherit',
										lg: 'inherit',
										md: 'center',
										sm: 'center',
										xs: 'inherit',
									},
									margin: {
										xl: 'inherit',
										lg: 'inherit',
										md: '10px 0',
										sm: '10px 0',
										xs: '10px 0',
									},
								}}>
								<a href={`https://play.google.com/store`}>
									<GooglePlay width={116} height={38} />
								</a>
								<a href={`https://www.apple.com/app-store/`}>
									<AppStore width={116} height={38} />
								</a>
							</Grid>
						</Grid>

						{/* Social media */}
						<Grid
							item
							xl={2}
							lg={2}
							md={12}
							sm={12}
							xs={12}
							style={{display: 'flex'}}
							sx={{
								justifyContent: {
									xl: 'inherit',
									lg: 'inherit',
									md: 'center',
									sm: 'center',
									xs: 'inherit',
								},
							}}>
							<SocialMediaIconIconButtonStyled
								sx={{
									margin: {
										xl: 'inherit',
										lg: 'inherit',
										md: '0 3px',
										sm: '0 3px',
										xs: '0 3px',
									},
								}}
								component='a'
								href={`https://www.facebook.com`}>
								<GrFacebookOption />
							</SocialMediaIconIconButtonStyled>

							<SocialMediaIconIconButtonStyled
								sx={{
									margin: {
										xl: 'inherit',
										lg: 'inherit',
										md: '0 3px',
										sm: '0 3px',
										xs: '0 3px',
									},
								}}
								component='a'
								href={`https://twitter.com`}>
								<BsTwitter />
							</SocialMediaIconIconButtonStyled>

							<SocialMediaIconIconButtonStyled
								sx={{
									margin: {
										xl: 'inherit',
										lg: 'inherit',
										md: '0 3px',
										sm: '0 3px',
										xs: '0 3px',
									},
								}}
								component='a'
								href={`https://www.instagram.com/`}>
								<FiInstagram />
							</SocialMediaIconIconButtonStyled>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

const FooterContactSectionBoxLeftStyled = styled(Box)`
	display: flex;
	align-items: center;
`;

const IconButtonFiPhoneCallStyled = styled(IconButton)`
	background-color: #ffffff;
	font-size: 1.125rem;
	width: 2.625rem;
	height: 2.625rem;
	border: 1px solid #e2e4ec;
	border-radius: 50%;
	margin: 0 15px 0 0;
`;

const SocialMediaIconIconButtonStyled = styled(IconButton)`
	color: #233a95;
	background-color: #ffffff;
	font-size: 0.9375rem;
	width: 2.125rem;
	height: 2.125rem;
	border: 1px solid #e4e5ee;
	border-radius: 50%;
	margin: 0;
`;

const TypographyPhoneNumberStyled = styled(Typography)`
	font-size: 1.25rem;
	font-weight: 600;
	margin-bottom: 3px;
`;

const TypographyCaptionStoreOpenTime = styled(Typography)`
	font-size: 11px;
	color: #202435;
	opacity: 0.5;
`;
