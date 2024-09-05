import { EditProfileFormType } from '@components/Forms/EditProfileForm/types';
import { RegistrationData } from '@interfaces/registration';
import { ReceivedUserData, UserData } from '@interfaces/user';
import {
	INCORRECT_LOGIN_INFORMATION_MESSAGE,
	USER_NOT_FOUND_MESSAGE,
} from '@src/components/Forms/LoginForm/constants';
import { LOG_OUT_ERROR_MESSAGE } from '@src/components/NavBar/MiniProfile/constants';
import { LoginData } from '@src/interfaces/login';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	Timestamp,
	updateDoc,
	where,
} from 'firebase/firestore';

import { auth, db, googleProvider } from './config';

export const getUserData = async (): Promise<ReceivedUserData | null> =>
	new Promise<ReceivedUserData | null>((resolve, reject) => {
		onAuthStateChanged(auth, async (user) => {
			if (!user) {
				resolve(null);
				return;
			}

			try {
				const userDocRef = doc(db, 'users', user.uid);
				const userDoc = await getDoc(userDocRef);

				if (!userDoc.exists()) {
					reject(new Error('User document not found'));
					return;
				}

				const userData = {
					...userDoc.data(),
					id: userDoc.id,
				} as ReceivedUserData;

				resolve(userData);
			} catch (error) {
				reject(new Error('Failed to retrieve user data'));
			}
		});
	});

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

export const updateUserDataWithAnotherData = async (
	data: EditProfileFormType
): Promise<void> => {
	try {
		const user = auth.currentUser;

		if (!user) {
			throw new Error('User not authenticated');
		}

		const userDocRef = doc(db, 'users', user.uid);

		const birth_date = Timestamp.fromDate(
			new Date(Date.UTC(data.year!, data.month!, data.day!, 0, 0, 0, 0))
		);

		console.log(data);

		await updateDoc(userDocRef, {
			name: data.name,
			bio: data.bio,
			login_name: data.login_name,
			profile_image: data.profile_image || null,
			background_profile_image: data.background_profile_image || null,
			birth_date: birth_date,
		});
	} catch (error) {
		console.error(error);
		throw new Error("Can't update user data");
	}
};

export const isOwner = (tweetOwnerId: string) =>
	auth.currentUser?.uid === tweetOwnerId;

export const getUserUid = () => auth.currentUser?.uid;
