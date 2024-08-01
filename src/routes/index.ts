import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const SignUp = lazy(() => import('@pages/SignUp'));

export const HOME_ROUTE = '/home';
export const SIGN_UP_ROUTE = '/sign_up';
export const REGISTER_ROUTE = '/register';
export const REGISTER_PASSWORD_ROUTE = '/register_password';
export const LOGIN_ROUTE = '/login';

export const routes = [
	{ path: HOME_ROUTE, Page: Home },
	{ path: SIGN_UP_ROUTE, Page: SignUp },
	{ path: REGISTER_PASSWORD_ROUTE, Page: 'div' },
	{ path: REGISTER_ROUTE, Page: Register },
	{ path: LOGIN_ROUTE, Page: Login },
];
