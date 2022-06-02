import styled from '@emotion/styled';
import {Box, Button} from '@mui/material';
import {AiOutlineMail} from 'react-icons/ai';

export default function TextFieldSubcribe() {
	return (
		<BoxTextFieldSubcribeStyled
			component='form'
			method='post'
			action='mailto:raymond.le.goldenowl@gmail.com'>
			{/* Text field */}
			<Box
				sx={{display: 'flex', alignItems: 'center', paddingLeft: '1.5rem'}}
				flex={5}>
				<AiOutlineMail size={25} color='#c2c2d3' />
				<TextFieldStyled
					type='email'
					name='email'
					placeholder='Your email address'
				/>
			</Box>

			{/* Submit button */}

			<ButtonStyled
				style={{flex: 1, color: '#fff'}}
				disableRipple={true}
				type='submit'>
				Subcribe
			</ButtonStyled>
		</BoxTextFieldSubcribeStyled>
	);
}

const BoxTextFieldSubcribeStyled = styled(Box)`
	display: flex;
	align-items: center;
	background-color: #fff;
	color: #666;

	border-radius: 5px;
	padding: 5px;
`;

const TextFieldStyled = styled.input`
	border: none;
	outline: none;
	width: 100%;
	padding: 0 15px;
	height: 3rem;
	border-radius: 4px;
	border: 1px solid transparent;
	transition: all 0.2s cubic-bezier(0.28, 0.12, 0.22, 1);
	font-size: 1rem;
`;

const ButtonStyled = styled(Button)`
	text-transform: inherit;
	font-size: 0.87rem;
	padding: 0 20px;
	background-color: #233a95;
	height: 3rem;
	&:hover {
		background-color: #233a95;
	}
`;
