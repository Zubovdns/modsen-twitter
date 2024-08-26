import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '@components/ThemeSwitcher';
import { auth, db } from '@src/firebase';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';

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
import { Tweet } from './types';

export const Home = () => {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [tweets, setTweets] = useState<Tweet[]>([]);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const user = auth.currentUser;
				if (user) {
					const userDoc = await getDoc(doc(db, 'users', user.uid));

					if (userDoc.exists()) {
						const userData = userDoc.data();
						setAvatarUrl(userData.profile_image);

						const following = userData.following || [];
						const userIds = [...following, user.uid];

						const tweetsQuery = query(
							collection(db, 'tweets'),
							where('user_id', 'in', userIds),
							orderBy('publish_time', 'desc')
						);

						const tweetDocs = await getDocs(tweetsQuery);
						const fetchedTweets = await Promise.all(
							tweetDocs.docs.map(async (docs) => {
								const tweetData = docs.data();
								const userDoc = await getDoc(
									doc(db, 'users', tweetData.user_id)
								);
								const userData = userDoc.exists() ? userDoc.data() : null;

								return {
									...tweetData,
									id: docs.id,
									user: userData,
								} as Tweet;
							})
						);
						setTweets(fetchedTweets);
					}
				}
			} catch (error) {
				console.error('Failed to load user data or tweets: ', error);
			}
		};

		fetchUserProfile();
	}, []);

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
