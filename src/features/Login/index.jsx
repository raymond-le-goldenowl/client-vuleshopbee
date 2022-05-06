import {useEffect} from 'react';
import {
	Typography,
	TextField,
	createTheme,
	ThemeProvider,
	Paper,
	Grid,
	Avatar,
	Button,
	Box,
	CssBaseline,
} from '@mui/material';
import {toast} from 'react-toastify';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {
	login,
	loginWithGoogle,
	loginWithFacebook,
	reset,
} from 'features/Auth/authSlice';

const theme = createTheme();

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {isError, isSuccess, message} = useSelector(state => state.auth);

	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
			dispatch(reset());
		}

		if (isSuccess) {
			navigate('/');
		}
	}, [isError, isSuccess]);

	const handleSubmit = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const userData = {
			email: data.get('email'),
			password: data.get('password'),
		};

		dispatch(login(userData));
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container component='main' sx={{height: '100vh'}}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/random)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: t =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar sx={{m: 1, bgcolor: 'secondary.main'}}></Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
							/>
							<TextField
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
							/>

							<Grid container justifyContent={'space-between'} alignItems='center'>
								<Grid item sm={6} textAlign='center'>
									<GoogleLogin
										icon=''
										clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
										buttonText='Login with Google'
										onSuccess={async res => {
											dispatch(loginWithGoogle(res));
										}}
									/>
								</Grid>
								<Grid item sm={6} textAlign='center'>
									<FacebookLogin
										textButton='Login with Facebook'
										buttonStyle={{
											textTransform: 'unset',
											fontSize: '14px',
											fontWeight: 500,
											padding: '10px',
											borderRadius: '3px',
											fontFamily: 'Roboto, sans-serif',
										}}
										appId={process.env.REACT_APP_FACEBOOK_APP_ID}
										autoLoad={false}
										fields='name,email,picture'
										onClick={() => {}}
										callback={res => {
											dispatch(loginWithFacebook(res));
										}}
									/>
								</Grid>
							</Grid>

							<Button component={Link} to={'/register'} fullWidth sx={{mt: 5}}>
								Create New Account
							</Button>
							<Button type='submit' fullWidth variant='contained' sx={{mb: 2}}>
								Sign In
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
