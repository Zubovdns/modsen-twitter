export const isValidPhoneNumber = (value: string) => {
	const phoneRegex =
		/^(\+?\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{4,9}$/;
	if (!phoneRegex.test(value)) {
		return 'Invalid phone number';
	}
	return true;
};
