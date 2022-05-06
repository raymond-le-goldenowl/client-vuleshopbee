import * as React from 'react';
import {Box, Button} from '@mui/material';

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
			<ProfileAvatar user={user || {}} />
			<Button
				color='inherit'
				type='button'
				onClick={onLogout}
				sx={{margin: '0 40px'}}>
				Logout
			</Button>
		</Box>
	);
}
