import React from 'react';
import {Link} from 'react-router-dom';
import {Badge, Box, IconButton} from '@mui/material';

import {pages} from './header.constant';
import {useSelector} from 'react-redux';

function RenderListAnchorDesktop({orders}) {
	const {user} = useSelector(state => state.auth);
	return (
		<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
			{pages.map(item => {
				if (item.path === '/account/order' && !user) return null;
				return (
					<IconButton
						key={item.id}
						size='small'
						aria-label='Show total of item in order'
						color='inherit'
						component={Link}
						to={item.path}
						style={{textTransform: 'inherit'}}>
						<Badge
							badgeContent={item.path === '/account/order' ? orders.length : null}
							color='error'>
							{item.text}
						</Badge>
					</IconButton>
				);
			})}
		</Box>
	);
}

export default RenderListAnchorDesktop;
