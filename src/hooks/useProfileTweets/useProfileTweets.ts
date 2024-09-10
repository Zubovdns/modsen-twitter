import { useEffect, useState } from 'react';
import {
	fetchTweetsByUserIDs,
	getUserUidFromLogin,
} from '@api/firebase/firestore';
import { TweetData } from '@interfaces/tweet';

import { UseProfileTweetsReturnType } from './types';

export const useProfileTweets = (
	login_name: string | null
): UseProfileTweetsReturnType => {
	const [tweets, setTweets] = useState<TweetData[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTweets = async () => {
			try {
				if (login_name) {
					const userUid = await getUserUidFromLogin(login_name);
					if (userUid) {
						const fetchedTweets = await fetchTweetsByUserIDs(
							[userUid],
							setLoading
						);
						setTweets(fetchedTweets);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchTweets();
	}, [login_name]);

	return [tweets, loading, setTweets];
};
