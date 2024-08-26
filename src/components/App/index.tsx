import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authenticatedRoutes, unauthenticatedRoutes } from '@src/routes';

import { Loader } from '../Loader';
import { MainLayout } from '../MainLayout';
import { ProtectedRoute } from '../ProtectedRoute';
import { UnauthenticatedRoute } from '../UnauthenticatedRoute';

export const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			{authenticatedRoutes.map(({ path, Page }) => (
				<Route
					key={path}
					path={path}
					element={
						<ProtectedRoute>
							<MainLayout Page={Page} />
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
