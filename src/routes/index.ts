import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Registration = lazy(() => import('@src/pages/Registration'));
const SignUp = lazy(() => import('@pages/SignUp'));

export const SIGN_UP_ROUTE = '/sign_up';
export const REGISTRATION_ROUTE = '/registration';
export const LOGIN_ROUTE = '/login';

export const HOME_ROUTE = '/home';
export const EXPLORE_ROUTE = '/explore';
export const NOTIFICATIONS_ROUTE = '/notifications';
export const MESSAGES_ROUTE = '/messages';
export const BOOKMARKS_ROUTE = '/bookmarks';
export const LISTS_ROUTE = '/lists';
export const PROFILE_ROUTE = '/profile';
export const MORE_ROUTE = '/more';

export const authenticatedRoutes = [
	{ path: HOME_ROUTE, Page: Home },
	{ path: EXPLORE_ROUTE, Page: Home },
	{ path: NOTIFICATIONS_ROUTE, Page: Home },
	{ path: MESSAGES_ROUTE, Page: Home },
	{ path: BOOKMARKS_ROUTE, Page: Home },
	{ path: LISTS_ROUTE, Page: Home },
	{ path: PROFILE_ROUTE, Page: Home },
	{ path: MORE_ROUTE, Page: Home },
];

export const unauthenticatedRoutes = [
	{ path: SIGN_UP_ROUTE, Page: SignUp },
	{ path: REGISTRATION_ROUTE, Page: Registration },
	{ path: LOGIN_ROUTE, Page: Login },
];
