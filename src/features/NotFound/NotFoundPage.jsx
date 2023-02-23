import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import {Box, Button, Grid, Typography} from '@mui/material';

export function NotFoundPage() {
	return (
		<GridStyled container spacing={0} alignItems='center' justify='center'>
			<BoxStyled>
				<Typography component='p' fontSize={'7vw'} color='#fff' fontWeight='bold'>
					Not Found
				</Typography>
				<Typography component='p'>
					<Button
						variant='outlined'
						style={{color: 'yellow', borderColor: 'yellow'}}
						component={Link}
						to='/'>
						Go Home
					</Button>
				</Typography>
			</BoxStyled>
		</GridStyled>
	);
}

const GridStyled = styled(Grid)`
	background: linear-gradient(45deg, #e2c2fd 15%, #61a798 90%);
	min-width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const BoxStyled = styled(Box)`
	max-width: 40%;
	min-height: 20vh;
	display: flex;
	align-items: center;
	flex-direction: column;
`;
