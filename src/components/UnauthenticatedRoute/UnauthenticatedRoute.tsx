import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@src/firebase';
import { HOME_ROUTE } from '@src/routes';
import { onAuthStateChanged } from 'firebase/auth';

import { Loader } from '../Loader';

interface UnauthenticatedRouteProps {
	children: ReactNode;
}

export const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
	children,
}) => {
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuthenticated(true);
				navigate(HOME_ROUTE);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [navigate]);

	if (loading) {
		return <Loader />;
	}

	return !isAuthenticated ? <>{children}</> : null;
};
