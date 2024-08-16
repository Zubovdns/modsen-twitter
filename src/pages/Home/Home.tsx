import { useEffect, useState } from 'react';
import SelectImageIcon from '@assets/icons/Tweet/SelectImageIcon.svg';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { auth, db } from '@src/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { PLACEHOLDER_TEXT, PLACEHOLDER_TITLE } from './constants';
import {
	Avatar,
	AvatarContainer,
	HeaderContainer,
	HomeContainer,
	Input,
	InputContainer,
	InputOptions,
	OptionButton,
	OptionIcon,
	OptionsGroup,
	PlaceholderContainer,
	PlaceholderText,
	PlaceholderTitle,
	Title,
	TweetButton,
	UserTweetAvatarWrapper,
	UserTweetContainer,
} from './styled';

export const Home = () => {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const user = auth.currentUser;
				if (user) {
					const userDocRef = doc(db, 'users', user.uid);
					const userDoc = await getDoc(userDocRef);

					if (userDoc.exists()) {
						const userData = userDoc.data();
						setAvatarUrl(userData.profile_image);
					}
				}
			} catch (error) {
				console.error('Failed to load user data.');
			}
		};

		fetchUserProfile();
	}, []);

	return (
		<HomeContainer>
			<HeaderContainer>
				<Title>Home</Title>
				<ThemeSwitcher />
			</HeaderContainer>
			<UserTweetContainer>
				<UserTweetAvatarWrapper>
					<AvatarContainer>
						<Avatar src={avatarUrl || ''} />
					</AvatarContainer>
				</UserTweetAvatarWrapper>
				<InputContainer>
					<Input placeholder='Whats happening?!' />
					<InputOptions>
						<OptionsGroup>
							<OptionButton>
								<OptionIcon src={SelectImageIcon} />
							</OptionButton>
						</OptionsGroup>
						<TweetButton>Tweet</TweetButton>
					</InputOptions>
				</InputContainer>
			</UserTweetContainer>
			<PlaceholderContainer>
				<PlaceholderTitle>{PLACEHOLDER_TITLE}</PlaceholderTitle>
				<PlaceholderText>{PLACEHOLDER_TEXT}</PlaceholderText>
			</PlaceholderContainer>
		</HomeContainer>
	);
};
