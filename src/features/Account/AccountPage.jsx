import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {Box, Container, Tab} from '@mui/material';

import styled from '@emotion/styled';

import {logout} from 'features/Auth/authSlice';
import {OrderHistoryPage} from 'features/Order';

const LOGOUT_INDEX = '2';
export default function AccountPage() {
	const [tabIndex, setTabIndex] = useState('1');

	const dispatch = useDispatch();

	const handleChange = (event, newValue) => {
		if (newValue === LOGOUT_INDEX) {
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
							<TabLogoutStyled
								onClick={handleClickLogoutButton}
								disableRipple={true}
								label='LOGOUT'
								value={LOGOUT_INDEX}
							/>
						</TabList>
					</Box>
					<TabPanel value='1'>
						<OrderHistoryPage />
					</TabPanel>
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
	color: #fff;
	background: #6580bb;

	width: auto;
	padding: 0 15px;
	border-radius: 3px;
	margin: 0 1.0625rem;
	font-size: 1.0625rem;
	font-weight: bolder;
	font-family: 'Dosis', sans-serif !important;
`;
