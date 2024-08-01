import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@src/routes';

import { Loader } from '../Loader';

export const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path='/' element={<Navigate to='/home' />} />
			{routes.map(({ path, Page }) => (
				<Route key={path} path={path} element={<Page />} />
			))}
		</Routes>
	</Suspense>
);
