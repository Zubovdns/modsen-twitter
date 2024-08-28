import { useState } from 'react';
import { SearchPanel } from '@src/components/SearchPanel';
import { ThemeSwitcher } from '@src/components/ThemeSwitcher';

import { TweetInput } from '../Home/TweetInput';

import {
	BannerImage,
	BannerImageContainer,
	BannerWrapper,
	Bio,
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

export const Profile = () => {
	const [bannerError, setBannerError] = useState(false);
	const [profileError, setProfileError] = useState(false);

	return (
		<>
			<ProfileWrapper>
				<ProfileContainer>
					<HeaderContainer>
						<TitleContainer>
							<Title>Profile</Title>
							<NumberOfPosts>20 Tweets</NumberOfPosts>
						</TitleContainer>
						<ThemeSwitcher />
					</HeaderContainer>
					<ProfileHeaderContainer>
						<BannerWrapper>
							<BannerImageContainer>
								{!bannerError ? (
									<BannerImage
										src='https://via.placeholder.com/350x150'
										alt='Banner'
										onError={() => setBannerError(true)}
									/>
								) : null}
							</BannerImageContainer>

							<ProfileImageContainer>
								{!profileError ? (
									<ProfileImage
										src='https://via.placeholder.com/130'
										alt='Profile'
										onError={() => setProfileError(true)}
									/>
								) : null}
							</ProfileImageContainer>
						</BannerWrapper>
						<EditButtonContainer>
							<EditButton>Edit profile</EditButton>
						</EditButtonContainer>

						<TextContainer>
							<UsernameContainer>
								<Name>Monika</Name>
								<Username>@zubovdns</Username>
							</UsernameContainer>
							<Bio>Love Is War</Bio>
							<Info>Joined September 2019</Info>
							<FollowInfo>58 Following | 7 Followers</FollowInfo>
						</TextContainer>
					</ProfileHeaderContainer>
					<TweetInput avatarUrl='https://via.placeholder.com/130' />
				</ProfileContainer>
			</ProfileWrapper>
			<SearchPanel />
		</>
	);
};
