import { useEffect, useState } from 'react';
import { TweetInput } from '@components/TweetInput';
import { SearchPanel } from '@src/components/SearchPanel';
import { ThemeSwitcher } from '@src/components/ThemeSwitcher';
import { auth, db } from '@src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

import {
	BannerImage,
	BannerImageContainer,
	BannerWrapper,
	Bio,
	DontExistContainer,
	DontExistText,
	DontExistTitle,
	EditButton,
	EditButtonContainer,
	FollowInfo,
	HeaderContainer,
	Info,
	Name,
	NumberOfPosts,
	ProfileContainer,
	ProfileHeaderContainer,
	ProfileImage,
	ProfileImageContainer,
	ProfileWrapper,
	TextContainer,
	Title,
	TitleContainer,
	Username,
	UsernameContainer,
} from './styled';
import { UserData } from './types';

export const Profile = () => {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);

	const login_name = window.location.pathname.substring(1);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const usersRef = collection(db, 'users');
				const q = query(usersRef, where('login_name', '==', login_name));
				const querySnapshot = await getDocs(q);

				if (!querySnapshot.empty) {
					const userDoc = querySnapshot.docs[0];
					const userData = userDoc.data() as UserData;
					setUserData(userData);

					onAuthStateChanged(auth, (currentUser) => {
						if (currentUser && currentUser.uid === userDoc.id) {
							setIsCurrentUser(true);
						} else {
							setIsCurrentUser(false);
						}
					});
				} else {
					setUserData(null);
				}
			} catch (error) {
				console.error('Ошибка при получении данных пользователя:', error);
				setUserData(null);
			}
		};

		fetchUserData();
	}, [login_name]);

	return (
		<>
			<ProfileWrapper>
				<ProfileContainer>
					<HeaderContainer>
						<TitleContainer>
							<Title>Profile</Title>
							{userData && <NumberOfPosts>20 Tweets</NumberOfPosts>}
						</TitleContainer>
						<ThemeSwitcher />
					</HeaderContainer>
					<ProfileHeaderContainer>
						<BannerWrapper>
							<BannerImageContainer>
								{userData?.background_profile_image && (
									<BannerImage
										src={userData?.background_profile_image}
										alt='Banner image'
									/>
								)}
							</BannerImageContainer>

							<ProfileImageContainer>
								{userData?.profile_image && (
									<ProfileImage
										src={userData.profile_image}
										alt='Profile image'
									/>
								)}
							</ProfileImageContainer>
						</BannerWrapper>
						<EditButtonContainer>
							{isCurrentUser && <EditButton>Edit profile</EditButton>}
						</EditButtonContainer>

						<TextContainer>
							<UsernameContainer>
								<Name>{userData ? userData.name : '@' + login_name}</Name>
								{userData && <Username>@{login_name}</Username>}
							</UsernameContainer>
							{userData && (
								<>
									<Bio>Mock</Bio>
									{userData.birth_date && (
										<Info>Date of birth {userData.birth_date}</Info>
									)}
									<FollowInfo>11 Following | 11 Followers</FollowInfo>
								</>
							)}
						</TextContainer>
					</ProfileHeaderContainer>
					{isCurrentUser && (
						<TweetInput avatarUrl={userData?.profile_image || ''} />
					)}

					<DontExistContainer>
						<DontExistTitle>This account doesn’t exist</DontExistTitle>
						<DontExistText>Try searching for another.</DontExistText>
					</DontExistContainer>
				</ProfileContainer>
			</ProfileWrapper>
			<SearchPanel />
		</>
	);
};
