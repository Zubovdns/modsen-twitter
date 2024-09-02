import { UserData } from '@src/interfaces/user';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db, googleProvider } from '.';

export const getUserData = async (): Promise<UserData | null> => {
	const user = auth.currentUser;

	if (!user) {
		return null;
	}

	const userDocRef = doc(db, 'users', user.uid);
	const userDocSnap = await getDoc(userDocRef);

	if (userDocSnap.exists()) {
		return userDocSnap.data() as UserData;
	} else {
		throw new Error('User document not found');
	}
};

export const loginViaGoogle = async (): Promise<void> => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		const userDocRef = doc(db, 'users', user.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (!userDocSnap.exists()) {
			const userData: UserData = {
				name: user.displayName || '',
				phone_number: user.phoneNumber || '',
				birth_date: null,
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
		throw new Error('Cant login via google');
	}
};
