import React from 'react';
import {MdSearch} from 'react-icons/md';
import {Box, InputBase} from '@mui/material';
import {styled, alpha} from '@mui/material/styles';

function HeaderSearch({onSearch}) {
	return (
		<Box variant='h6' component='div' sx={{flexGrow: 1, margin: '0 10px'}}>
			<Search>
				<SearchIconWrapper>
					<MdSearch />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder='Search…'
					inputProps={{'aria-label': 'search'}}
					onChange={onSearch}
				/>
			</Search>
		</Box>
	);
}

export default HeaderSearch;

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));
