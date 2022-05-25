import styled from '@emotion/styled';
import {Box, Container, Grid, Typography} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import {FaStripe} from 'react-icons/fa';

export default function FooterCopyright() {
	return (
		<Box component='section' padding='2.875rem 0 4.3125rem 0'>
			<Container maxWidth='lg'>
				<GridContainerStyled container>
					<GridItemStyled
						item
						xl={6}
						lg={6}
						md={8}
						sm={12}
						xs={12}
						sx={{
							justifyContent: {
								xs: 'flex-start',
								sm: 'center',
								md: 'flex-start',
								lg: 'flex-start',
								xl: 'flex-start',
							},
						}}>
						<Typography
							component='p'
							variant='caption'
							style={{verticalAlign: 'center'}}>
							Copyright 2022 © Bacola WordPress Theme. All rights reserved. Powered by
							KlbTheme.
						</Typography>
					</GridItemStyled>
					<GridItemStyled
						item
						xl={3}
						lg={3}
						md={4}
						sm={6}
						xs={12}
						sx={{
							justifyContent: {
								xs: 'flex-start',
								sm: 'center',
								md: 'flex-start',
								lg: 'flex-end',
								xl: 'flex-end',
							},
						}}>
						<Typography component={Link} to={`#`} variant='caption'>
							Privacy Policy
						</Typography>
						<Typography component={Link} to={`#`} variant='caption'>
							Terms and Conditions
						</Typography>
						<Typography component={Link} to={`#`} variant='caption'>
							Cookie
						</Typography>
					</GridItemStyled>
					<GridItemStyled
						item
						xl={3}
						lg={3}
						md={12}
						sm={6}
						xs={12}
						sx={{
							justifyContent: {
								xs: 'flex-start',
								sm: 'center',
								md: 'flex-start',
								lg: 'flex-end',
								xl: 'flex-end',
							},
						}}>
						<FaStripe size={40} />
					</GridItemStyled>
				</GridContainerStyled>
			</Container>
		</Box>
	);
}

const GridContainerStyled = styled(Grid)`
	justify-content: center;
	& * {
		color: #9b9bb4;
	}
`;

const GridItemStyled = styled(Grid)`
	display: flex;
	align-items: center;
	padding: 0.875rem 0;
`;
