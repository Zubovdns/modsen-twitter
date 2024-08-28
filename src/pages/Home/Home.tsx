/* eslint-disable no-nested-ternary */
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { TweetInput } from '@components/TweetInput';
import { TweetItem } from '@components/TweetItem';
import { Loader } from '@src/components/Loader';
import { SearchPanel } from '@src/components/SearchPanel';
import { auth, db } from '@src/firebase';
import { useUserTweets } from '@src/hooks/useUserTweets/useUserTweets';
import { deleteDoc, doc } from 'firebase/firestore';

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
	const [avatarUrl, tweets, loading, setTweets] = useUserTweets();

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

	console.log(tweets, loading);

	return (
		<>
			<HomeWrapper>
				<HomeContainer>
					<HeaderContainer>
						<Title>Home</Title>
						<ThemeSwitcher />
					</HeaderContainer>
					<TweetInput avatarUrl={avatarUrl} />
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
									tweet.likes_user_id?.includes(auth.currentUser?.uid || '') ||
									false
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
