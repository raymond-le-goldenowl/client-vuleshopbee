import styled from '@emotion/styled';
import {Box, Container, Grid, Typography} from '@mui/material';
import React from 'react';

export default function FooterCategoriesSection() {
	return (
		<Box component='section' padding='6.25rem 0' backgroundColor='#f7f8fd'>
			<Container maxWidth='lg'>
				<Grid
					container
					justifyContent='space-between'
					sx={{
						justifyContent: {
							xs: 'none',
							sm: 'none',
							md: 'none',
							lg: 'space-between',
							xl: 'space-between',
						},
					}}>
					<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
						<TypographyTitleStyled>FRUIT & VEGETABLES</TypographyTitleStyled>
						<TypographyEachContent>Cuts & Sprouts</TypographyEachContent>
						<TypographyEachContent>Exotic Fruits & Veggies</TypographyEachContent>
						<TypographyEachContent>Fresh Fruits</TypographyEachContent>
						<TypographyEachContent>Fresh Vegetables</TypographyEachContent>
						<TypographyEachContent>Herbs & Seasonings</TypographyEachContent>
						<TypographyEachContent>Packaged Produce</TypographyEachContent>
						<TypographyEachContent>Party Trays</TypographyEachContent>
					</Grid>
					<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
						<TypographyTitleStyled>BREAKFAST & DAIRY</TypographyTitleStyled>
						<TypographyEachContent>Butter and Margarine</TypographyEachContent>
						<TypographyEachContent>Cheese</TypographyEachContent>
						<TypographyEachContent>Eggs Substitutes</TypographyEachContent>
						<TypographyEachContent>Honey</TypographyEachContent>
						<TypographyEachContent>Marmalades</TypographyEachContent>
						<TypographyEachContent>Milk & Flavoured Milk</TypographyEachContent>
						<TypographyEachContent>Sour Cream and Dips</TypographyEachContent>
						<TypographyEachContent>Yogurt</TypographyEachContent>
					</Grid>
					<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
						<TypographyTitleStyled> MEAT & SEAFOOD</TypographyTitleStyled>
						<TypographyEachContent>Beef</TypographyEachContent>
						<TypographyEachContent>Breakfast Sausage</TypographyEachContent>
						<TypographyEachContent>Chicken</TypographyEachContent>
						<TypographyEachContent>Crab and Shellfish</TypographyEachContent>
						<TypographyEachContent>Dinner Sausage</TypographyEachContent>
						<TypographyEachContent>Farm Raised Fillets</TypographyEachContent>
						<TypographyEachContent>Shrimp</TypographyEachContent>
						<TypographyEachContent>Sliced Deli Meat</TypographyEachContent>
						<TypographyEachContent>Wild Caught Fillets</TypographyEachContent>
					</Grid>
					<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
						<TypographyTitleStyled> BEVERAGES</TypographyTitleStyled>
						<TypographyEachContent>Coffee</TypographyEachContent>
						<TypographyEachContent>Craft Beer</TypographyEachContent>
						<TypographyEachContent>Drink Boxes & Pouches</TypographyEachContent>
						<TypographyEachContent>Milk & Plant-Based Milk</TypographyEachContent>
						<TypographyEachContent>Soda & Pop</TypographyEachContent>
						<TypographyEachContent>Sparkling Water</TypographyEachContent>
						<TypographyEachContent>Tea & Kombucha</TypographyEachContent>
						<TypographyEachContent>Water</TypographyEachContent>
						<TypographyEachContent>Wine</TypographyEachContent>
					</Grid>
					<Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
						<TypographyTitleStyled> BREADS & BAKERY</TypographyTitleStyled>
						<TypographyEachContent>Butter and Margarine</TypographyEachContent>
						<TypographyEachContent>Cheese</TypographyEachContent>
						<TypographyEachContent>Eggs Substitutes</TypographyEachContent>
						<TypographyEachContent>Honey</TypographyEachContent>
						<TypographyEachContent>Marmalades</TypographyEachContent>
						<TypographyEachContent>Milk & Flavoured Milk</TypographyEachContent>
						<TypographyEachContent>Sour Cream and Dips</TypographyEachContent>
						<TypographyEachContent>Yogurt</TypographyEachContent>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

const TypographyTitleStyled = styled(Typography)`
	color: #202435;
	font-size: 15px;
	margin: 0 0 20px;
	font-weight: 500;
`;

const TypographyEachContent = styled(Typography)`
	color: #71778e;
	text-decoration: none;
	font-weight: 400;
	font-size: 13px;
	line-height: 1.6rem;
`;
