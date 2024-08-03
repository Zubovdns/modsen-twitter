import { db } from '@src/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

export const isValidEmail = async (value: string) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(value)) {
		return 'Invalid email address';
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
