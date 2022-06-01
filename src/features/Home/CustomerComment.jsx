import {Box, Typography} from '@mui/material';
import DisplayImage from 'components/DisplayImage';
import avatarCustomerComment from 'assets/images/avatar-customer-comment.jpg';

export default function CustomerComment() {
	return (
		<Box>
			<Typography
				component='h4'
				style={{fontSize: '15px', margin: '0 0 20px', fontWeight: 500}}>
				CUSTOMER COMMENT
			</Typography>

			<Box style={{backgroundColor: '#fffbec', padding: '30px'}}>
				<Box>
					<Typography style={{fontSize: '14px'}}>The Best Marketplace</Typography>

					<Typography style={{fontSize: ' .8125rem', color: '#71778e'}}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut.
					</Typography>
				</Box>

				<Box style={{display: 'flex', alignItems: 'center'}}>
					<img
						src={avatarCustomerComment}
						style={{
							width: '100%',
							borderRadius: '50%',
							flex: ' 0 0 3.125rem',
							maxWidth: '3.125rem',
						}}
						alt=''
					/>
					<Box flex={9}>
						<Typography style={{fontSize: '14px'}}>Tina Mcdonnell</Typography>
						<Typography style={{fontSize: '12px'}}>Sales Manager</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
