import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '@src/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectUserData, selectUserStatus } from '@store/selectors/user';
import { fetchUserData } from '@store/thunks/userThunk';

import { Loader } from '../Loader';

import { UnauthenticatedRouteProps } from './types';

export const UnauthenticatedRoute = ({
	children,
}: UnauthenticatedRouteProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userData = useAppSelector(selectUserData);
	const userStatus = useAppSelector(selectUserStatus);

	useEffect(() => {
		if (userStatus === 'idle') {
			dispatch(fetchUserData());
		} else if (userStatus === 'succeeded' && userData) {
			navigate(HOME_ROUTE);
		}
	}, [dispatch, navigate, userStatus, userData]);

	if (userStatus === 'loading') {
		return <Loader />;
	}

	return userStatus === 'succeeded' || !userData ? <>{children}</> : null;
};
