export const isValidName = (value: string) => {
	if (value.trim().length < 3) {
		return 'Name must be at least 3 characters long';
	}
	return true;
};
