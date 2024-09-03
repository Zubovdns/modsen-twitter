import { useEffect, useState } from 'react';
import { Loader } from '@components/Loader';
import { Modal } from '@components/Modal';
import { SearchPanel } from '@components/SearchPanel';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { TweetInput } from '@components/TweetInput';
import { TweetItem } from '@components/TweetItem';
import { useProfileTweets } from '@hooks/useProfileTweets';
import { UserData } from '@interfaces/user';
import {
	getUserDataByLogin,
	getUserUid,
	isOwner,
} from '@src/api/firebase/auth';
import { deleteTweet } from '@src/api/firebase/firestore';

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
	ModalTestPlaceholder,
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

export const Profile = () => {
	const login_name = window.location.pathname.substring(1);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [tweets, loading, setTweets] = useProfileTweets(login_name);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const fetchedUserData = await getUserDataByLogin(login_name);
				if (fetchedUserData) {
					const fetchedIsCurrentUser = isOwner(fetchedUserData.id);
					setUserData(fetchedUserData);
					setIsCurrentUser(fetchedIsCurrentUser);
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
			await deleteTweet(tweetId);
			setTweets((prevTweets) =>
				prevTweets.filter((tweet) => tweet.id !== tweetId)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
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
							{isCurrentUser && (
								<EditButton onClick={handleModalOpen}>Edit profile</EditButton>
							)}
							{isModalOpen && (
								<Modal onClose={handleModalClose} title='Edit profile'>
									<ModalTestPlaceholder></ModalTestPlaceholder>
								</Modal>
							)}
						</EditButtonContainer>

						<TextContainer>
							<UsernameContainer>
								<Name>{userData ? userData.name : '@' + login_name}</Name>
								{userData && <Username>@{userData.login_name}</Username>}
							</UsernameContainer>
							{userData && (
								<>
									<Bio>{userData.bio}</Bio>
									{userData.birth_date && (
										<Info>
											{'Date of birth: ' +
												userData.birth_date.toDate().toISOString()}
										</Info>
									)}
									<FollowInfo>{`${userData.following.length} Following | ${userData.followers.length} Followers`}</FollowInfo>
								</>
							)}
						</TextContainer>
					</ProfileHeaderContainer>
					{userData ? (
						<>
							{isCurrentUser && <TweetInput />}

							{loading ? (
								<Loader />
							) : (
								tweets.length > 0 &&
								tweets.map(
									({
										text,
										id,
										likes_user_id,
										image_url,
										publish_time,
										user_id,
									}) => (
										<TweetItem
											text={text}
											avatarUrl={userData.profile_image || ''}
											key={id}
											id={id}
											userName={userData.name || ''}
											likesAmount={likes_user_id?.length || 0}
											liked={
												likes_user_id?.includes(getUserUid() || '') || false
											}
											userLogin={`@${userData.login_name || ''}`}
											image={image_url}
											publishDate={new Date(publish_time.seconds * 1000)}
											userId={user_id}
											onDeleteTweet={handleDeleteTweet}
										/>
									)
								)
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
