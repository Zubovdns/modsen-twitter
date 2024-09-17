import { isFieldWithDataExistsInCollection } from '@api/firebase/firestore';

import { isValidLoginName } from './isValidLoginName';

export const isValidLoginNameAsync = async (value: string) => {
	const syncValidationCheck = isValidLoginName(value);
	if (syncValidationCheck !== true) {
		return syncValidationCheck;
	}

	try {
		const loginExists = await isFieldWithDataExistsInCollection(
			'users',
			'login_name',
			value
		);
		if (loginExists) {
			return 'Login already in use';
		}
		return true;
	} catch (error) {
		return 'Error validating login';
	}
};
