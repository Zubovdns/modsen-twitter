import { BookmarkIcon } from '@assets/icons/NavBar/Simple/BookmarkIcon';
import { ExploreIcon } from '@assets/icons/NavBar/Simple/ExploreIcon';
import { HomeIcon } from '@assets/icons/NavBar/Simple/HomeIcon';
import { ListIcon } from '@assets/icons/NavBar/Simple/ListIcon';
import { MessageIcon } from '@assets/icons/NavBar/Simple/MessageIcon';
import { NotificationIcon } from '@assets/icons/NavBar/Simple/NotificationIcon';
import {
	BOOKMARKS_ROUTE,
	EXPLORE_ROUTE,
	HOME_ROUTE,
	LISTS_ROUTE,
	MESSAGES_ROUTE,
	NOTIFICATIONS_ROUTE,
} from '@src/routes';

export const TWEET_BUTTON = 'Tweet';

export const navBarList = [
	{
		name: 'Home',
		to: HOME_ROUTE,
		icon: HomeIcon,
	},
	{
		name: 'Explore',
		to: EXPLORE_ROUTE,
		icon: ExploreIcon,
	},
	{
		name: 'Notification',
		to: NOTIFICATIONS_ROUTE,
		icon: NotificationIcon,
	},
	{
		name: 'Messages',
		to: MESSAGES_ROUTE,
		icon: MessageIcon,
	},
	{
		name: 'Bookmarks',
		to: BOOKMARKS_ROUTE,
		icon: BookmarkIcon,
	},
	{
		name: 'Lists',
		to: LISTS_ROUTE,
		icon: ListIcon,
	},
];
