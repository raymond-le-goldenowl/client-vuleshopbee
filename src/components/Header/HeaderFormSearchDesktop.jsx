import {FiSearch} from 'react-icons/fi';
import {Box, InputBase} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useSelector} from 'react-redux';

function HeaderFormSearchDesktop({onSearch, onSubmitSearchProduct}) {
	const {searchValue} = useSelector(state => state.product);
	return (
		<Box variant='h6' component='div' sx={{flexGrow: 1, margin: '0 10px'}}>
			<Search onSubmit={onSubmitSearchProduct}>
				<SearchIconWrapper>
					<FiSearch />
				</SearchIconWrapper>
				<StyledInputBase
					defaultValue={searchValue}
					placeholder='Search for products...'
					inputProps={{'aria-label': 'search'}}
					onChange={({target}) => onSearch(target.value)}
				/>
			</Search>
		</Box>
	);
}

export default HeaderFormSearchDesktop;

const Search = styled('form')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: '#f3f4f7',
	padding: '14px 15px',
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
	top: 0,
	right: 0,
	fontSize: '1.6rem',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	width: '100%',
	paddingRight: '40px',
}));
