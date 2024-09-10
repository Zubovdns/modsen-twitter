/* eslint-disable no-nested-ternary */
import { deleteTweet } from '@api/firebase/firestore';
import { Loader } from '@components/Loader';
import { SearchPanel } from '@components/SearchPanel';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { TweetInput } from '@components/TweetInput';
import { TweetItem } from '@components/TweetItem';
import { useUserTweets } from '@hooks/useUserTweets/useUserTweets';

import { PLACEHOLDER_TEXT, PLACEHOLDER_TITLE } from './constants';
import {
	HeaderContainer,
	HomeContainer,
	HomeWrapper,
	PlaceholderContainer,
	PlaceholderText,
	PlaceholderTitle,
	Title,
} from './styled';

export const Home = () => {
	const [tweets, loading, setTweets, refreshTweets] = useUserTweets();

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

	return (
		<>
			<HomeWrapper>
				<HomeContainer>
					<HeaderContainer>
						<Title>Home</Title>
						<ThemeSwitcher />
					</HeaderContainer>
					<TweetInput setTweets={refreshTweets} />
					{loading ? (
						<Loader />
					) : tweets.length > 0 ? (
						tweets.map(
							({
								text,
								id,
								image_url,
								likes_user_id,
								publish_time,
								user,
								user_id,
							}) => (
								<TweetItem
									text={text}
									avatarUrl={user.profile_image}
									key={id}
									id={id}
									userName={user.name}
									likesAmount={likes_user_id.length}
									likesArray={likes_user_id}
									userLogin={user.login_name}
									image={image_url}
									publishDate={publish_time}
									userId={user_id}
									onDeleteTweet={handleDeleteTweet}
								/>
							)
						)
					) : (
						<PlaceholderContainer>
							<PlaceholderTitle>{PLACEHOLDER_TITLE}</PlaceholderTitle>
							<PlaceholderText>{PLACEHOLDER_TEXT}</PlaceholderText>
						</PlaceholderContainer>
					)}
				</HomeContainer>
			</HomeWrapper>
			<SearchPanel />
		</>
	);
};
