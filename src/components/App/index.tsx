import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
	authenticatedRoutes,
	HOME_ROUTE,
	unauthenticatedRoutes,
} from '@src/routes';

import { Loader } from '../Loader';
import { ProtectedRoute } from '../ProtectedRoute';
import { UnauthenticatedRoute } from '../UnauthenticatedRoute';

export const App: React.FC = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path='/' element={<Navigate to={HOME_ROUTE} />} />
			{authenticatedRoutes.map(({ path, Page }) => (
				<Route
					key={path}
					path={path}
					element={
						<ProtectedRoute>
							<Page />
						</ProtectedRoute>
					}
				/>
			))}
			{unauthenticatedRoutes.map(({ path, Page }) => (
				<Route
					key={path}
					path={path}
					element={
						<UnauthenticatedRoute>
							<Page />
						</UnauthenticatedRoute>
					}
				/>
			))}
		</Routes>
	</Suspense>
);
