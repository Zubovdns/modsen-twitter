import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getUserDataByLogin, isFollowing, isOwner } from '@api/firebase/auth';
import { deleteTweet } from '@api/firebase/firestore';
import { EditProfile } from '@components/Forms/EditProfileForm';
import { Loader } from '@components/Loader';
import { Modal } from '@components/Modal';
import { SearchPanel } from '@components/SearchPanel';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { TweetInput } from '@components/TweetInput';
import { TweetItem } from '@components/TweetItem';
import { useModal } from '@hooks/useModal';
import { useProfileTweets } from '@hooks/useProfileTweets';
import { UserData } from '@interfaces/user';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectUserData, selectUserStatus } from '@store/selectors/user';
import { follow } from '@store/thunks/userThunk';
import { formattedDate } from '@utils/formatDate';

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
	FollowButton,
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

export const Profile = () => {
	const location = useLocation();
	const login_name = location.pathname.substring(1);

	const [tweets, loading, setTweets, refreshTweets] =
		useProfileTweets(login_name);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [isFollowed, setIsFollowed] = useState<boolean>(null!);

	const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

	const dispatch = useAppDispatch();
	const currentUserData = useAppSelector(selectUserData);
	const status = useAppSelector(selectUserStatus); // Получаем статус

	useEffect(() => {
		setUserData(null);
		setTweets([]);
		setIsFollowed(null!);

		const fetchUserData = async () => {
			try {
				const fetchedUserData = await getUserDataByLogin(login_name);
				if (fetchedUserData) {
					const fetchedIsCurrentUser = isOwner(fetchedUserData.id);
					const fetchedIsFollowed = await isFollowing(login_name);
					setUserData(fetchedUserData);
					setIsCurrentUser(fetchedIsCurrentUser);
					setIsFollowed(fetchedIsFollowed);
				}
			} catch (error) {
				console.error('Ошибка при получении данных пользователя:', error);
				setUserData(null);
			}
		};

		fetchUserData();
	}, [login_name, setTweets]);

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

	const onFollowClick = async () => {
		await dispatch(follow({ login_name, isFollowed }));
		setIsFollowed((prev) => !prev);
		if (!isFollowed) {
			setUserData((prev) => {
				if (!prev) return null;

				return {
					...prev,
					followers: [...prev.followers, currentUserData!.id],
				};
			});
		} else {
			setUserData((prev) => {
				if (!prev) return null;

				return {
					...prev,
					followers: prev.followers.filter(
						(item) => item !== currentUserData!.id
					),
				};
			});
		}
	};

	if (!userData) return <Loader />;

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
							{!isCurrentUser && (
								<FollowButton
									followed={isFollowed}
									onClick={onFollowClick}
									disabled={status === 'lazy-loading'}
								>
									{status === 'lazy-loading'
										? 'Loading...'
										: isFollowed
										? 'Unfollow'
										: 'Follow'}
								</FollowButton>
							)}
							{isModalOpen && (
								<Modal onClose={handleModalClose} title='Edit profile'>
									<EditProfile onClose={handleModalClose} />
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
											{'Date of birth: ' + formattedDate(userData.birth_date)}
										</Info>
									)}
									<FollowInfo>{`${userData.following.length} Following | ${userData.followers.length} Followers`}</FollowInfo>
								</>
							)}
						</TextContainer>
					</ProfileHeaderContainer>
					{userData ? (
						<>
							{isCurrentUser && <TweetInput setTweets={refreshTweets} />}

							{loading ? (
								<Loader />
							) : (
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
											avatarUrl={userData.profile_image}
											key={id}
											id={id}
											userName={userData.name}
											likesAmount={likes_user_id?.length}
											likesArray={likes_user_id}
											userLogin={userData.login_name}
											image={image_url}
											publishDate={publish_time}
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
