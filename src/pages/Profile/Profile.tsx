import { useEffect, useState } from 'react';
import { Loader } from '@components/Loader';
import { SearchPanel } from '@components/SearchPanel';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { TweetInput } from '@components/TweetInput';
import { TweetItem } from '@components/TweetItem';
import { useProfileTweets } from '@hooks/useProfileTweets';
import { auth, db } from '@src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';

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
	const login_name = window.location.pathname.substring(1);

	const [tweets, loading, setTweets] = useProfileTweets(login_name);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);

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

	const handleDeleteTweet = async (tweetId: string) => {
		try {
			await deleteDoc(doc(db, 'tweets', tweetId));
			setTweets((prevTweets) =>
				prevTweets.filter((tweet) => tweet.id !== tweetId)
			);
		} catch (error) {
			console.error('Failed to delete tweet: ', error);
		}
	};

	return (
		<>
			<ProfileWrapper>
				<ProfileContainer>
					<HeaderContainer>
						<TitleContainer>
							<Title>Profile</Title>
							{userData && (
								<NumberOfPosts>{tweets.length} Tweets</NumberOfPosts>
							)}
						</TitleContainer>
						<ThemeSwitcher />
					</HeaderContainer>

					<ProfileHeaderContainer>
						<BannerWrapper>
							<BannerImageContainer>
								{userData?.background_profile_image && (
									<BannerImage
										src={userData.background_profile_image}
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
					{userData ? (
						<>
							{isCurrentUser && (
								<TweetInput avatarUrl={userData.profile_image || ''} />
							)}

							{loading ? (
								<Loader />
							) : (
								tweets.length > 0 &&
								tweets.map((tweet) => (
									<TweetItem
										text={tweet.text}
										avatarUrl={userData.profile_image || ''}
										key={tweet.id}
										id={tweet.id}
										userName={userData.name || ''}
										likesAmount={tweet.likes_user_id?.length || 0}
										liked={
											tweet.likes_user_id?.includes(
												auth.currentUser?.uid || ''
											) || false
										}
										userLogin={`@${userData.login_name || ''}`}
										image={tweet.image_url}
										publishDate={new Date(tweet.publish_time.seconds * 1000)}
										userId={tweet.user_id}
										onDeleteTweet={handleDeleteTweet}
									/>
								))
							)}
						</>
					) : (
						<DontExistContainer>
							<DontExistTitle>This account doesn’t exist</DontExistTitle>
							<DontExistText>Try searching for another.</DontExistText>
						</DontExistContainer>
					)}
				</ProfileContainer>
			</ProfileWrapper>
			<SearchPanel />
		</>
	);
};
