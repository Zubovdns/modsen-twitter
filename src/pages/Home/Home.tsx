/* eslint-disable no-nested-ternary */
import { Loader } from '@components/Loader';
import { SearchPanel } from '@components/SearchPanel';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { TweetInput } from '@components/TweetInput';
import { TweetItem } from '@components/TweetItem';
import { useUserTweets } from '@hooks/useUserTweets/useUserTweets';
import { deleteTweet, getUserUid } from '@src/firebase/firebaseService';

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
	const [ tweets, loading, setTweets] = useUserTweets();

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
					<TweetInput />
					{loading ? (
						<Loader />
					) : tweets.length > 0 ? (
						tweets.map((tweet) => (
							<TweetItem
								text={tweet.text}
								avatarUrl={tweet.user?.profile_image || ''}
								key={tweet.id}
								id={tweet.id}
								userName={tweet.user?.name || ''}
								likesAmount={tweet.likes_user_id?.length || 0}
								liked={
									tweet.likes_user_id?.includes(getUserUid() || '') || false
								}
								userLogin={`@${tweet.user?.login_name || ''}`}
								image={tweet.image_url}
								publishDate={new Date(tweet.publish_time.seconds * 1000)}
								userId={tweet.user_id}
								onDeleteTweet={handleDeleteTweet}
							/>
						))
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
