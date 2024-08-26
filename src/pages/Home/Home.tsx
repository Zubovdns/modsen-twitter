import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { auth, db } from '@src/firebase';
import { useUserTweets } from '@src/hooks/useUserTweets/useUserTweets';
import { deleteDoc, doc } from 'firebase/firestore';

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
import { TweetItem } from './TweetItem';

export const Home = () => {
	const { avatarUrl, tweets, setTweets } = useUserTweets();

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
		<HomeContainer>
			<HeaderContainer>
				<Title>Home</Title>
				<ThemeSwitcher />
			</HeaderContainer>
			<TweetInput avatarUrl={avatarUrl} />

			{tweets.length > 0 ? (
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
	);
};
