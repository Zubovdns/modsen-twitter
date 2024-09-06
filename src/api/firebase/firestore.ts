import { TweetData, TweetInputData } from '@src/interfaces/tweet';
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

import { auth, db } from './config';

export const createTweet = async (data: TweetInputData): Promise<void> => {
	try {
		const user = auth.currentUser;
		if (user) {
			await addDoc(collection(db, 'tweets'), {
				text: data.text,
				image_url: data.imageUrl,
				likes_user_id: [],
				publish_time: new Date(),
				user_id: user.uid,
			});
		}
	} catch (error) {
		throw new Error('Error with creating tweet');
	}
};

export const deleteTweet = async (tweetId: string): Promise<void> => {
	try {
		await deleteDoc(doc(db, 'tweets', tweetId));
	} catch (error) {
		throw new Error('Failed to delete tweet');
	}
};

export const likeTweet = async (
	tweetId: string,
	isLiked: boolean
): Promise<void> => {
	try {
		const tweetDocRef = doc(db, 'tweets', tweetId);
		const userId = auth.currentUser?.uid;

		if (isLiked) {
			await updateDoc(tweetDocRef, {
				likes_user_id: arrayRemove(userId),
			});
		} else {
			await updateDoc(tweetDocRef, {
				likes_user_id: arrayUnion(userId),
			});
		}
	} catch (error) {
		throw new Error("Can't like this tweet");
	}
};

export const getUserUidFromLogin = async (login_name: string) => {
	const userQuery = query(
		collection(db, 'users'),
		where('login_name', '==', login_name)
	);
	const userDocs = await getDocs(userQuery);

	if (userDocs.empty) {
		return null;
	}

	return userDocs.docs[0].id;
};

export const fetchTweetsByUserIDs = async (
	userIDs: string[],
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<TweetData[]> => {
	try {
		const tweetsQuery = query(
			collection(db, 'tweets'),
			where('user_id', 'in', userIDs),
			orderBy('publish_time', 'desc')
		);

		setLoading(true);

		const tweetDocs = await getDocs(tweetsQuery);
		const fetchedTweets = await Promise.all(
			tweetDocs.docs.map(async (docItem) => {
				const tweetData = docItem.data();
				const userDoc = await getDoc(doc(db, 'users', tweetData.user_id));
				const userData = userDoc.exists() ? userDoc.data() : null;

				return {
					...tweetData,
					id: docItem.id,
					user: userData,
				} as TweetData;
			})
		);
		return fetchedTweets;
	} catch (error) {
		throw new Error('Failed to fetch tweets');
	} finally {
		setLoading(false);
	}
};

export const isFieldWithDataExistsInCollection = async (
	collectionName: 'users' | 'tweets',
	field: string,
	data: string
): Promise<boolean> => {
	try {
		const q = query(collection(db, collectionName), where(field, '==', data));
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
	} catch (error) {
		throw new Error('Error checking field in Firestore');
	}
};
