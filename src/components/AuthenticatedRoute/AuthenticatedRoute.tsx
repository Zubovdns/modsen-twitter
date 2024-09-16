import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectUserStatus } from '@src/store/selectors/user';
import { fetchUserData } from '@src/store/thunks/userThunk';
import { status } from '@store/slices/types';

import { Loader } from '../Loader';

import { AuthenticatedRouteProps } from './types';

export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);

	useEffect(() => {
		if (userStatus === status.IDLE) {
			dispatch(fetchUserData());
		}
	}, [dispatch, userStatus]);

	if (userStatus === status.LOADING) {
		return <Loader />;
	}

	return (
		(userStatus === status.SUCCEEDED || userStatus === status.LAZY_LOADING) &&
		children
	);
};
