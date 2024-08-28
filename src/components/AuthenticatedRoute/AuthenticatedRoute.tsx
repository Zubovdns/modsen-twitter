import { useEffect, useState } from 'react';
import { auth } from '@src/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { Loader } from '../Loader';

import { AuthenticatedRouteProps } from './types';

export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, () => {
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return children;
};
