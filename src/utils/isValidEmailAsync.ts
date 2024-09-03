import { db } from '@src/firebaseApi/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { isValidEmail } from './isValidEmail';

export const isEmailExistsInFirestore = async (
	email: string
): Promise<boolean> => {
	try {
		const q = query(collection(db, 'users'), where('email', '==', email));
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
	} catch (error) {
		console.error('Error checking email in Firestore: ', error);
		throw new Error('Error checking email in Firestore');
	}
};

export const isValidEmailAsync = async (value: string) => {
	const syncValidationCheck = isValidEmail(value);
	if (syncValidationCheck !== true) {
		return syncValidationCheck;
	}

	try {
		const emailExists = await isEmailExistsInFirestore(value);
		if (emailExists) {
			return 'Email already in use';
		}
		return true;
	} catch (error) {
		return 'Error validating email address';
	}
};
