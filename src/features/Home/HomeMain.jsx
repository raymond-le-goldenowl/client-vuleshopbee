import {Grid} from '@mui/material';

export default function HomeMain({children}) {
	return (
		<Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
			{children}
		</Grid>
	);
}
