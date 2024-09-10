export const isValidLoginName = (loginName: string) => {
	if (loginName.length < 3 || loginName.length > 15) {
		return 'Login name must be 3 - 15 characters long';
	}

	const regex = /^[a-zA-Z0-9]+$/;
	return regex.test(loginName)
		? true
		: 'Login can contain only numbers and letters of any case';
};
