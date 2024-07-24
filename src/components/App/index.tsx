import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@src/routes';

export const App = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Routes>
			<Route path='/' element={<Navigate to='/home' />} />
			{routes.map(({ path, Page }) => (
				<Route key={path} path={path} element={<Page />} />
			))}
		</Routes>
	</Suspense>
);
