import {Grid} from '@mui/material';

export default function HomeAside({children}) {
	return (
		<Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
			{children}
		</Grid>
	);
}
