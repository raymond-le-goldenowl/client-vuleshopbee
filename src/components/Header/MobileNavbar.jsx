import React from 'react';
import {Box, Button} from '@mui/material';
import {GiHamburgerMenu} from 'react-icons/gi';

function MobileNavbar({children, toggleDrawer}) {
	return (
		<Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
			<Button
				size='small'
				arial-label='menu'
				onClick={toggleDrawer('left', true)}
				style={{fontSize: '2rem', backgroundColor: '#fff'}}>
				<GiHamburgerMenu />
			</Button>

			{children}
		</Box>
	);
}

export default MobileNavbar;
