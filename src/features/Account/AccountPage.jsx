import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {Box, Container, Tab} from '@mui/material';

import styled from '@emotion/styled';

import {logout} from 'features/Auth/authSlice';
import {OrderHistoryPage} from 'features/Order';

export default function AccountPage() {
	const [tabIndex, setTabIndex] = useState('1');

	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		if (newValue === '3') {
			return null;
		}
		setTabIndex(newValue);
	};

	const handleClickLogoutButton = () => {
		dispatch(logout());
	};
	return (
		<Container maxWidth='lg'>
			<Box sx={{width: '100%', typography: 'body1'}}>
				<TabContext value={tabIndex}>
					<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
						<TabList
							onChange={handleChange}
							aria-label='lab API tabs example'
							orientation='horizontal'>
							<TabStyled label='ORDERS' value='1' />
							<TabStyled label='ACCOUNT DETAILS' value='2' />
							<TabLogoutStyled
								onClick={handleClickLogoutButton}
								disableRipple={true}
								label='LOGOUT'
								value='3'
							/>
						</TabList>
					</Box>
					<TabPanel value='1'>
						<OrderHistoryPage />
					</TabPanel>
					<TabPanel value='2'>Item Three</TabPanel>
				</TabContext>
			</Box>
		</Container>
	);
}
const TabStyled = styled(Tab)`
	font-size: 1.0625rem;
	width: auto;
	padding-left: 0;
	padding-right: 0;
	color: #c2c2d3;
	font-family: 'Dosis', sans-serif !important;
	font-weight: bolder;
`;
const TabLogoutStyled = styled(Tab)`
	all: unset;
	cursor: pointer;
	margin: 0 1.0625rem;
	font-size: 1.0625rem;
	width: auto;
	padding-left: 0;
	padding-right: 0;
	color: #c2c2d3;
	font-family: 'Dosis', sans-serif !important;
	font-weight: bolder;
`;
