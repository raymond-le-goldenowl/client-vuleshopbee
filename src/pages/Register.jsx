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
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {register, reset} from 'containers/Auth/authSlice';

const theme = createTheme();

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {user, isLoading, isError, isSuccess, message} = useSelector(
		state => state.auth,
	);

	useEffect(() => {
		if (isError) {
			if (typeof message !== 'string') {
				toast.error(message[0]);
			} else {
				toast.error(message);
			}
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleSubmit = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const userData = {
			username: data.get('username'),
			email: data.get('email'),
			password: data.get('password'),
		};

		dispatch(register(userData));
	};

	if (isLoading) {
		//! return <Spinner />;
	}

	return (
		<div className='app-vuleshopbee'>
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
								Register
							</Typography>
							<Box component='form' noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='username'
									label='Username'
									name='username'
									autoComplete='username'
									autoFocus
								/>
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

								<Grid container sx={{mt: 5}}>
									<Typography flex alignItems={'center'}>
										<Typography component='span'>Have already an account?</Typography>
										<Button component={Link} to={'/login'}>
											Login Here
										</Button>
									</Typography>
								</Grid>
								<Button type='submit' fullWidth variant='contained' sx={{mb: 2}}>
									Sign In
								</Button>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</ThemeProvider>
		</div>
	);
}
