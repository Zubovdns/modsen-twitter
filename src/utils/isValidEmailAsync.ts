import { isFieldWithDataExistsInCollection } from '@api/firebase/firestore';

import { isValidEmail } from './isValidEmail';

export const isValidEmailAsync = async (value: string) => {
	const syncValidationCheck = isValidEmail(value);
	if (syncValidationCheck !== true) {
		return syncValidationCheck;
	}

	try {
		const emailExists = await isFieldWithDataExistsInCollection(
			'users',
			'email',
			value
		);
		if (emailExists) {
			return 'Email already in use';
		}
		return true;
	} catch (error) {
		return 'Error validating email address';
	}
};
