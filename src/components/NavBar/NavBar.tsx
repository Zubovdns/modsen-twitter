import TwitterLogo from '@assets/icons/TwitterLogo.svg';

import { navBarList, TWEET_BUTTON } from './constants';
import { Item } from './Item';
import { Profile } from './Profile';
import { ItemContainer, Logo, NavBarContainer, TweetButton } from './styled';

export const NavBar = () => (
	<NavBarContainer>
		<ItemContainer>
			<Logo src={TwitterLogo} alt={TwitterLogo} />
			{navBarList.map(({ name, to, icon }, index) => (
				<Item text={name} to={to} icon={icon} key={'item-$' + index} />
			))}
			<TweetButton>{TWEET_BUTTON}</TweetButton>
		</ItemContainer>
		<Profile />
	</NavBarContainer>
);
