import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@src/firebase';
import { SIGN_UP_ROUTE } from '@src/routes';
import { onAuthStateChanged } from 'firebase/auth';

import { Loader } from '../Loader';

import { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				navigate(SIGN_UP_ROUTE);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [navigate]);

	if (loading) {
		return <Loader />;
	}

	return isAuthenticated ? <>{children}</> : null;
};
