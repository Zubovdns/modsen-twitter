export const isValidEmail = (value: string): true | string => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(value)) {
		return 'Invalid email address';
	}
	return true;
};
