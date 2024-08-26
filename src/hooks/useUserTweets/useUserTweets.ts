import { useEffect, useState } from 'react';
import { auth, db } from '@src/firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore';

import { Tweet } from './types';

export const useUserTweets = () => {
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

	return { avatarUrl, tweets, setTweets };
};
