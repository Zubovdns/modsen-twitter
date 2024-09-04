import { useEffect, useState } from 'react';
import { getUserUid } from '@api/firebase/auth';
import { TweetData } from '@interfaces/tweet';
import { fetchTweetsByUserIDs } from '@src/api/firebase/firestore';
import { useAppSelector } from '@store/hooks';
import { selectUserData } from '@store/selectors/user';

import { UseUserTweetsReturnType } from './types';

export const useUserTweets = (): UseUserTweetsReturnType => {
	const [tweets, setTweets] = useState<TweetData[]>([]);
	const [loading, setLoading] = useState(true);
	const userData = useAppSelector(selectUserData);

	useEffect(() => {
		const fetchTweets = async () => {
			try {
				const userUid = getUserUid();

				if (userData && userUid) {
					const following = [...userData.following, userUid];
					const fetchedTweets = await fetchTweetsByUserIDs(
						following,
						setLoading
					);
					setTweets(fetchedTweets);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchTweets();
	}, [userData]);

	return [tweets, loading, setTweets];
};
