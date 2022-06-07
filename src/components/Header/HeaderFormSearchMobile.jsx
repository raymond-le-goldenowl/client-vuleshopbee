import {FiSearch} from 'react-icons/fi';
import {InputBase} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useSelector} from 'react-redux';

function HeaderFormSearchMobile({
	onSearch,
	isMobileSearch,
	onSubmitSearchProduct,
}) {
	const {searchValue} = useSelector(state => state.product);

	return (
		<Search
			style={{display: isMobileSearch ? 'block' : 'none'}}
			onSubmit={onSubmitSearchProduct}>
			<SearchIconWrapper>
				<FiSearch color='black' />
			</SearchIconWrapper>
			<StyledInputBase2
				// disabled={true}
				defaultValue={searchValue}
				placeholder='Search for products...'
				inputProps={{'aria-label': 'search'}}
				onChange={({target}) => onSearch(target.value)}
			/>
		</Search>
	);
}

export default HeaderFormSearchMobile;

const Search = styled('form')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: '#fff',
	padding: '15px',
	width: 'auto',
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
	right: 15,
	fontSize: '1.5rem',
	zIndex: 2,
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	width: '100%',
	padding: '15px',
	backgroundColor: '#f3f4f7',
	borderRadius: 10,
	paddingRight: '45px',
}));

const StyledInputBase2 = styled(StyledInputBase)`
	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 4;
		cursor: pointer;
	}
`;
