import {
	Box,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
	IconButton,
	Tooltip,
} from '@mui/material';
import {useState} from 'react';
import {MdLogout, MdSettings} from 'react-icons/md';

import ProfileAvatar from './ProfileAvatar';

export default function AccountMenuDesktop({user, onLogout}) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box
			component='div'
			sx={{
				flexGrow: 0,
				display: {
					xs: 'none',
					md: 'flex',
				},
				alignItems: 'cener',
				margin: '0 10px',
			}}>
			<Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
				<Tooltip title='Account settings'>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ml: 2}}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}>
						<Avatar sx={{width: 32, height: 32}}>
							<ProfileAvatar user={user || {}} />
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
				<MenuItem>
					<ListItemIcon>
						<MdSettings fontSize={22} />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={onLogout}>
					<ListItemIcon>
						<MdLogout fontSize={22} />
					</ListItemIcon>
					Đăng xuất
				</MenuItem>
			</Menu>
		</Box>
	);
}
