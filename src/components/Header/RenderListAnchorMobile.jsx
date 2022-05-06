import React from 'react';
import {Link} from 'react-router-dom';
import {Badge, Box, Button, Drawer, IconButton, MenuItem} from '@mui/material';

import AccountMenuMobile from './AccountMenuMobile';

import {pages} from './header.constant';

function RenderListAnchorMobile({
	toggleDrawer,
	anchor,
	user,
	onLogout,
	orders,
	choosePosition,
}) {
	return (
		<React.Fragment key={'left'}>
			<Drawer
				anchor={'left'}
				open={choosePosition['left']}
				onClose={toggleDrawer('left', false)}>
				<Box
					role='presentation'
					onClick={toggleDrawer(anchor, false)}
					onKeyDown={toggleDrawer(anchor, false)}
					display='flex'
					flexDirection='column'>
					{!user && (
						<Button
							size='small'
							color='inherit'
							component={Link}
							to='/login'
							style={{
								textTransform: 'inherit',
								color: '#000',
								padding: '10px 30px',
								fontSize: '1.3rem',
								fontWeight: 'bold',
							}}>
							Đăng nhập
						</Button>
					)}
					{user && <AccountMenuMobile user={user} onLogout={onLogout} />}
					{pages.map(item => {
						if (item.path === '/account/order' && !user) return null;
						return (
							<Button
								key={item.id}
								size='small'
								aria-label='Show total of item in order'
								color='inherit'
								component={Link}
								to={item.path}
								style={{
									textTransform: 'inherit',
									color: '#000',
									padding: '10px 30px',
									fontSize: '1.3rem',
									fontWeight: 'bold',
								}}>
								<Badge
									badgeContent={item.path === '/account/order' ? orders.length : null}
									color='error'>
									{item.text}
								</Badge>
							</Button>
						);
					})}
				</Box>
			</Drawer>
		</React.Fragment>
	);
}

export default RenderListAnchorMobile;
