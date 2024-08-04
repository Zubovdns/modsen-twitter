import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@src/firebase';
import { HOME_ROUTE, SIGN_UP_ROUTE } from '@src/routes';
import { onAuthStateChanged } from 'firebase/auth';

import { Loader } from '../Loader';

import { AuthCheckerProps } from './types';

export const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate(HOME_ROUTE);
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

	return <>{children}</>;
};
