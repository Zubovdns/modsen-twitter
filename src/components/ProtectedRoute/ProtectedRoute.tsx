import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_ROUTE } from '@src/routes';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectUserData, selectUserStatus } from '@src/store/selectors/user';
import { fetchUserData } from '@src/store/thunks/userThunk';

import { Loader } from '../Loader';

import { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userData = useAppSelector(selectUserData);
	const userStatus = useAppSelector(selectUserStatus);

	useEffect(() => {
		if (userStatus === 'idle') {
			dispatch(fetchUserData());
		} else if (userStatus === 'succeeded' && !userData) {
			navigate(SIGN_UP_ROUTE);
		}
	}, [dispatch, navigate, userStatus, userData]);

	if (userStatus === 'loading') {
		return <Loader />;
	}

	console.log('protect');

	return userData ? <>{children}</> : null;
};
