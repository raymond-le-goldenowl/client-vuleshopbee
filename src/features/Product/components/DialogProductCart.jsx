import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
	useMediaQuery,
	useTheme,
	IconButton,
	Backdrop,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import {useState} from 'react';

export default function DialogProductCart() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Dialog
			fullWidth
			maxWidth='md'
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'>
			<DialogTitle id='alert-dialog-title'>
				{"Use Google's location service?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					Let Google help apps determine location. This means sending anonymous
					location data to Google, even when no apps are running.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Disagree</Button>
				<Button onClick={handleClose} autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}
