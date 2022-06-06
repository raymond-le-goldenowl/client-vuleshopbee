import {resetToInital} from 'features/Cart/cartSlice';
import {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}) {
	const dispatch = useDispatch();
	const {user, isLoading} = useSelector(state => state.auth);
	let content = children;

	if (isLoading) {
		content = <Fragment>Loading...</Fragment>;
	} else {
		if (!user) {
			dispatch(resetToInital());
			content = <Navigate to='/' replace />;
		}
	}

	return content;
}
