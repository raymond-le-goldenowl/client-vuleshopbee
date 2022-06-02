import {reset} from 'features/Auth/authSlice';
import {resetToInital} from 'features/Cart/cartSlice';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}) {
	const dispatch = useDispatch();
	const {user, isLoading} = useSelector(state => state.auth);
	if (isLoading) return null;
	if (!user) {
		dispatch(reset());
		dispatch(resetToInital());
		return <Navigate to='/' replace />;
	}
	return children;
}
