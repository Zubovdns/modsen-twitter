export const isValidBio = (bio: string) => {
	if (bio.length < 3 || bio.length > 255) {
		return 'Bio must be 3 - 255 characters long';
	}

	return true;
};
