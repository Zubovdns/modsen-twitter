import { useEffect, useState } from 'react';
import { db } from '@src/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { Tweet, UseProfileTweetsReturnType } from './types';

export const useProfileTweets = (
	login_name: string | null
): UseProfileTweetsReturnType => {
	const [tweets, setTweets] = useState<Tweet[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserProfileAndTweets = async () => {
			try {
				if (login_name) {
					const usersRef = collection(db, 'users');
					const q = query(usersRef, where('login_name', '==', login_name));

					const userDocs = await getDocs(q);

					if (!userDocs.empty) {
						setLoading(true);
						const userDoc = userDocs.docs[0];

						const tweetsQuery = query(
							collection(db, 'tweets'),
							where('user_id', '==', userDoc.id),
							orderBy('publish_time', 'desc')
						);

						const tweetDocs = await getDocs(tweetsQuery);
						const fetchedTweets: Tweet[] = tweetDocs.docs.map((doc) => {
							const tweetData = doc.data();

							const tweet: Tweet = {
								id: doc.id,
								text: tweetData.text,
								image_url: tweetData.image_url || undefined,
								publish_time: tweetData.publish_time,
								user_id: userDoc.id,
								likes_user_id: tweetData.likes_user_id,
							};

							return tweet;
						});

						setTweets(fetchedTweets);
					}
				}
			} catch (error) {
				console.error('Failed to load user data or tweets: ', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfileAndTweets();
	}, [login_name]);

	return [tweets, loading, setTweets];
};
