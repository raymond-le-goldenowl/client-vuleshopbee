import {resetToInital} from 'features/Cart/cartSlice';
import {LinearProgress} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}) {
	const dispatch = useDispatch();
	const {user, isLoading, isSuccess} = useSelector(state => state.auth);
	let content = children;

	if (isLoading) {
		content = <LinearProgress />;
	}

	if (isSuccess && !user) {
		dispatch(resetToInital());
		content = <Navigate to='/' replace />;
	}

	return content;
}
