import { RegistrationData } from '@interfaces/registration';
import { UserData } from '@interfaces/user';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db, googleProvider } from '.';

export const getUserData = async (): Promise<UserData | null> => {
	try {
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
	} catch (error) {
		throw new Error('Cant check auth: ' + error);
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

			await setDoc(doc(db, 'users', user.uid), {
				name: data.name,
				phone_number: data.phone,
				birth_date: birthDate,
				email: data.email,
				profile_image: null,
				background_profile_image: null,
				login_name: user.uid,
				followers: [],
				following: [],
			});
		} catch (error) {
			throw new Error('Error saving user data, user deleted: ' + error);
		}
	} catch (error) {
		throw new Error('Error creating user: ' + error);
	}
};
