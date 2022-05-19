import {Link} from 'react-router-dom';
import {Badge, Box, Button, Drawer} from '@mui/material';

import AccountMenuMobile from './AccountMenuMobile';

import {Fragment} from 'react';

function RenderListAnchorMobile({
	toggleDrawer,
	anchor,
	user,
	onLogout,
	orders,
	choosePosition,
}) {
	return (
		<Fragment key={'left'}>
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
								fontSize: '1.1rem',
							}}>
							Đăng nhập
						</Button>
					)}
					{user && <AccountMenuMobile user={user} onLogout={onLogout} />}

					<Button
						size='small'
						aria-label='Show total of item in order'
						color='inherit'
						component={Link}
						to={'/'}
						style={{
							textTransform: 'inherit',
							color: '#000',
							padding: '10px 30px',
							fontSize: '1.1rem',
						}}>
						Trang chủ
					</Button>

					{user && (
						<Button
							size='small'
							aria-label='Show total of item in order'
							color='inherit'
							component={Link}
							to={'/account/order'}
							style={{
								textTransform: 'inherit',
								color: '#000',
								padding: '10px 30px',
								fontSize: '1.1rem',
							}}>
							<Badge badgeContent={orders.length || 0} color='error'>
								Đơn hàng
							</Badge>
						</Button>
					)}
				</Box>
			</Drawer>
		</Fragment>
	);
}

export default RenderListAnchorMobile;
