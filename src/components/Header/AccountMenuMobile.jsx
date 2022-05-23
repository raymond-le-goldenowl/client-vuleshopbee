import * as React from 'react';
import {Avatar, Box, Button} from '@mui/material';

import ProfileAvatar from './ProfileAvatar';

export default function AccountMenuMobile({user, onLogout}) {
	return (
		<Box
			sx={{
				flexGrow: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<Avatar sx={{width: 32, height: 32}}>
				<ProfileAvatar user={user || {}} />
			</Avatar>
			<Button
				size='large'
				style={{margin: '10px 0', fontWeight: 'bolder'}}
				color='inherit'
				type='button'
				onClick={onLogout}
				sx={{margin: '0 40px'}}>
				Logout
			</Button>
		</Box>
	);
}
