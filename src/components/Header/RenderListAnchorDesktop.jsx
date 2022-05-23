import {Link} from 'react-router-dom';
import {IoHome} from 'react-icons/io5';
import {Box, IconButton} from '@mui/material';
function RenderListAnchorDesktop() {
	return (
		<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
			<IconButton
				size='small'
				aria-label='Trang chủ'
				color='inherit'
				component={Link}
				to={'/'}
				style={{textTransform: 'inherit', display: 'flex', alignItems: 'center'}}>
				<IoHome size={40} />
			</IconButton>
		</Box>
	);
}

export default RenderListAnchorDesktop;
