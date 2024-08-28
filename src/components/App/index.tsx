import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from '@src/pages/Profile';
import {
	authenticatedRoutes,
	HOME_ROUTE,
	unauthenticatedRoutes,
} from '@src/routes';

import { AuthenticatedRoute } from '../AuthenticatedRoute';
import { Loader } from '../Loader';
import { MainLayout } from '../MainLayout';
import { ProtectedRoute } from '../ProtectedRoute';
import { UnauthenticatedRoute } from '../UnauthenticatedRoute';

export const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path='/' element={<Navigate to={HOME_ROUTE} />} />

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
			<Route
				key='*'
				path='*'
				element={
					<AuthenticatedRoute>
						<MainLayout Page={Profile} />
					</AuthenticatedRoute>
				}
			/>
		</Routes>
	</Suspense>
);
