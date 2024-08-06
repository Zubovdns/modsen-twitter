import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Registration = lazy(() => import('@src/pages/Registration'));
const SignUp = lazy(() => import('@pages/SignUp'));

export const HOME_ROUTE = '/home';
export const SIGN_UP_ROUTE = '/sign_up';
export const REGISTRATION_ROUTE = '/registration';
export const LOGIN_ROUTE = '/login';

export const authenticatedRoutes = [{ path: HOME_ROUTE, Page: Home }];

export const unauthenticatedRoutes = [
	{ path: SIGN_UP_ROUTE, Page: SignUp },
	{ path: REGISTRATION_ROUTE, Page: Registration },
	{ path: LOGIN_ROUTE, Page: Login },
];
