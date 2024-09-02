import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '.';

export interface UserData {
	name: string;
	email: string;
	followers: string[];
	following: string[];
	login_name: string;
	birth_date: string | null;
	phone_number: string | null;
	profile_image: string | null;
	background_profile_image: string | null;
}

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
