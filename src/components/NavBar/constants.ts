import BookmarksIcon from '@assets/icons/NavBar/Simple/BookmarksIcon.svg';
import ExploreIcon from '@assets/icons/NavBar/Simple/ExploreIcon.svg';
import HomeIcon from '@assets/icons/NavBar/Simple/HomeIcon.svg';
import ListsIcon from '@assets/icons/NavBar/Simple/ListsIcon.svg';
import MessagesIcon from '@assets/icons/NavBar/Simple/MessagesIcon.svg';
import NotificationsIcon from '@assets/icons/NavBar/Simple/NotificationsIcon.svg';
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
		icon: NotificationsIcon,
	},
	{
		name: 'Messages',
		to: MESSAGES_ROUTE,
		icon: MessagesIcon,
	},
	{
		name: 'Bookmarks',
		to: BOOKMARKS_ROUTE,
		icon: BookmarksIcon,
	},
	{
		name: 'Lists',
		to: LISTS_ROUTE,
		icon: ListsIcon,
	},
];
