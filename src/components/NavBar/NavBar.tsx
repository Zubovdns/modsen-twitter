import MoreIcon from '@assets/icons/NavBar/Simple/MoreIcon.svg';
import ProfileIcon from '@assets/icons/NavBar/Simple/ProfileIcon.svg';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { Modal } from '@components/Modal';
import { TweetInput } from '@components/TweetInput';
import { useModal } from '@hooks/useModal';
import { MORE_ROUTE } from '@src/routes';
import { useAppSelector } from '@src/store/hooks';
import { selectUserData } from '@src/store/selectors/user';

import { navBarList, TWEET_BUTTON } from './constants';
import { Item } from './Item';
import { MiniProfile } from './MiniProfile';
import {
	ItemContainer,
	Logo,
	NavBarContainer,
	TweetButton,
	TweetInputWrapper,
} from './styled';

export const NavBar = () => {
	const userData = useAppSelector(selectUserData);

	const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

	return (
		<NavBarContainer>
			<ItemContainer>
				<Logo src={TwitterLogo} alt={TwitterLogo} />
				{userData && (
					<>
						{navBarList.map(({ name, to, icon }, index) => (
							<Item text={name} to={to} icon={icon} key={'item-$' + index} />
						))}
						<Item
							text={'Profile'}
							icon={ProfileIcon}
							to={'/' + userData?.login_name}
						/>
					</>
				)}
				<Item text={'More'} icon={MoreIcon} to={MORE_ROUTE} />
				{userData && (
					<TweetButton onClick={handleModalOpen}>{TWEET_BUTTON}</TweetButton>
				)}
				{isModalOpen && (
					<Modal onClose={handleModalClose} title='Tweet'>
						<TweetInputWrapper>
							<TweetInput onTweetClick={handleModalClose} />
						</TweetInputWrapper>
					</Modal>
				)}
			</ItemContainer>
			{userData && <MiniProfile userData={userData} />}
		</NavBarContainer>
	);
};
