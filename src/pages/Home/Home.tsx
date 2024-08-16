import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { auth, db } from '@src/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { PLACEHOLDER_TEXT, PLACEHOLDER_TITLE } from './constants';
import {
	HeaderContainer,
	HomeContainer,
	PlaceholderContainer,
	PlaceholderText,
	PlaceholderTitle,
	Title,
} from './styled';
import { TweetInput } from './TweetInput';

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
			<TweetInput avatarUrl={avatarUrl} />
			<PlaceholderContainer>
				<PlaceholderTitle>{PLACEHOLDER_TITLE}</PlaceholderTitle>
				<PlaceholderText>{PLACEHOLDER_TEXT}</PlaceholderText>
			</PlaceholderContainer>
		</HomeContainer>
	);
};
