import { useEffect, useState } from 'react';
import { TweetData } from '@interfaces/tweet';
import {
	fetchTweetsByUserIDs,
	getUserUid,
} from '@src/firebase/firebaseService';
import { useAppSelector } from '@store/hooks';
import { selectUserData } from '@store/selectors/user';

import { UseUserTweetsReturnType } from './types';

export const useUserTweets = (): UseUserTweetsReturnType => {
	const [tweets, setTweets] = useState<TweetData[]>([]);
	const [loading, setLoading] = useState(true);
	const userData = useAppSelector(selectUserData);

	useEffect(() => {
		const fetchUserProfileAndTweets = async () => {
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
			} finally {
				setLoading(false);
			}
		};

		fetchUserProfileAndTweets();
	}, [userData]);

	return [tweets, loading, setTweets];
};
