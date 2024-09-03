import { RegistrationData } from '@interfaces/registration';
import { ReceivedUserData, UserData } from '@interfaces/user';
import {
	INCORRECT_LOGIN_INFORMATION_MESSAGE,
	USER_NOT_FOUND_MESSAGE,
} from '@src/components/Forms/LoginForm/constants';
import { LOG_OUT_ERROR_MESSAGE } from '@src/components/NavBar/MiniProfile/constants';
import { LoginData } from '@src/interfaces/login';
import { TweetData, TweetInputData } from '@src/interfaces/tweet';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
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
	setDoc,
	Timestamp,
	updateDoc,
	where,
} from 'firebase/firestore';

import { auth, db, googleProvider } from '.';

export const getUserData = async (): Promise<ReceivedUserData | null> => {
	try {
		const user = auth.currentUser;

		if (!user) {
			return null;
		}

		const userDocRef = doc(db, 'users', user.uid);
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			return {
				...userDoc.data(),
				id: userDoc.id,
			} as ReceivedUserData;
		} else {
			throw new Error('User document not found');
		}
	} catch (error) {
		throw new Error('Cant check auth: ' + error);
	}
};

export const getUserDataByLogin = async (
	login_name: string
): Promise<ReceivedUserData | null> => {
	const userQuery = query(
		collection(db, 'users'),
		where('login_name', '==', login_name)
	);
	const userDocs = await getDocs(userQuery);

	if (userDocs.empty) {
		return null;
	}

	return {
		...userDocs.docs[0].data(),
		id: userDocs.docs[0].id,
	} as ReceivedUserData;
};

export const loginViaGoogle = async (): Promise<void> => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		const userDocRef = doc(db, 'users', user.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (!userDocSnap.exists()) {
			const userData: UserData = {
				name: user.displayName || user.uid,
				phone_number: user.phoneNumber,
				birth_date: null,
				bio: null,
				email: user.email || '',
				profile_image: null,
				background_profile_image: null,
				login_name: user.uid,
				followers: [],
				following: [],
			};

			await setDoc(userDocRef, userData);
		}
	} catch (error) {
		throw new Error('Cant login via google: ' + error);
	}
};

export const registerViaEmail = async (
	data: RegistrationData
): Promise<void> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			data.email!,
			data.password!
		);
		const user = userCredential.user;

		try {
			const birthDate = new Date(
				Date.UTC(data.year!, data.month!, data.day!, 0, 0, 0, 0)
			);

			const userData: UserData = {
				name: data.name,
				phone_number: data.phone,
				birth_date: Timestamp.fromDate(birthDate),
				bio: null,
				email: data.email,
				profile_image: null,
				background_profile_image: null,
				login_name: user.uid,
				followers: [],
				following: [],
			};

			await setDoc(doc(db, 'users', user.uid), userData);
		} catch (error) {
			throw new Error('Error saving user data, user deleted: ' + error);
		}
	} catch (error) {
		throw new Error('Error creating user: ' + error);
	}
};

export const loginViaEmail = async (data: LoginData): Promise<void> => {
	const { login, password } = data;
	try {
		const isEmail = login.includes('@');
		const usersRef = collection(db, 'users');
		const q = query(
			usersRef,
			where(isEmail ? 'email' : 'phone_number', '==', login)
		);
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			throw new Error('USER_NOT_FOUND');
		}

		const userDoc = querySnapshot.docs[0];
		const userData = userDoc.data();

		await signInWithEmailAndPassword(auth, userData.email, password);
	} catch (error: unknown) {
		if (error instanceof Error) {
			if (error.message === 'USER_NOT_FOUND') {
				throw new Error(USER_NOT_FOUND_MESSAGE);
			} else {
				throw new Error(INCORRECT_LOGIN_INFORMATION_MESSAGE);
			}
		}
	}
};

export const logOut = async (): Promise<void> => {
	try {
		await signOut(auth).then();
	} catch (error) {
		throw new Error(LOG_OUT_ERROR_MESSAGE);
	}
};

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

export const isOwner = (tweetOwnerId: string) =>
	auth.currentUser?.uid === tweetOwnerId;

export const getUserUid = () => auth.currentUser?.uid;

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
