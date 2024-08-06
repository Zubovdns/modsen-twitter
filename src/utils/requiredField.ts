export const requiredField = (value: { trim: () => string }): true | string => {
	if (value.trim() === '') {
		return 'This field is required';
	}
	return true;
};
