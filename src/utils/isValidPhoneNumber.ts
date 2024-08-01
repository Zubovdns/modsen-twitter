export const isValidPhoneNumber = (value: string) => {
	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(value)) {
		return 'Invalid phone number';
	}
	return true;
};
