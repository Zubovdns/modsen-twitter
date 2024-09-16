import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectUserStatus } from '@src/store/selectors/user';
import { fetchUserData } from '@src/store/thunks/userThunk';

import { Loader } from '../Loader';

import { AuthenticatedRouteProps } from './types';

export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);

	useEffect(() => {
		if (userStatus === 'idle') {
			dispatch(fetchUserData());
		}
	}, [dispatch, userStatus]);

	if (userStatus === 'loading') {
		return <Loader />;
	}

	return (
		(userStatus === 'succeeded' || userStatus === 'lazy-loading') && children
	);
};
