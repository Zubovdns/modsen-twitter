import { MoreIcon } from '@assets/icons/NavBar/Simple/MoreIcon';
import { ProfileIcon } from '@assets/icons/NavBar/Simple/ProfileIcon';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { MORE_ROUTE } from '@src/routes';
import { useAppSelector } from '@src/store/hooks';
import { selectUserData } from '@src/store/selectors/user';

import { navBarList, TWEET_BUTTON } from './constants';
import { Item } from './Item';
import { MiniProfile } from './MiniProfile';
import { ItemContainer, Logo, NavBarContainer, TweetButton } from './styled';

export const NavBar = () => {
	const userData = useAppSelector(selectUserData);

	return (
		<NavBarContainer>
			<ItemContainer>
				<Logo src={TwitterLogo} alt={TwitterLogo} />
				{userData && (
					<>
						{navBarList.map(({ name, to, icon }, index) => (
							<Item text={name} to={to} Icon={icon} key={'item-$' + index} />
						))}
						<Item
							text={'Profile'}
							Icon={ProfileIcon}
							to={'/' + userData?.login_name}
						/>
					</>
				)}
				<Item text={'More'} Icon={MoreIcon} to={MORE_ROUTE} />
				{userData && <TweetButton>{TWEET_BUTTON}</TweetButton>}
			</ItemContainer>
			{userData && <MiniProfile userData={userData} />}
		</NavBarContainer>
	);
};
