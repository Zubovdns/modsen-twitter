import { isValidBio } from '../isValidBio';

describe('isValidBio', () => {
	it('should return an error if bio is shorter than 3 characters', () => {
		expect(isValidBio('Hi')).toBe('Bio must be 3 - 255 characters long');
	});

	it('should return an error if bio is longer than 255 characters', () => {
		const longBio = 'a'.repeat(256);
		expect(isValidBio(longBio)).toBe('Bio must be 3 - 255 characters long');
	});

	it('should return true if bio is between 3 and 255 characters', () => {
		expect(isValidBio('Hello, this is a valid bio!')).toBe(true);
	});

	it('should return true for a bio with exactly 3 characters', () => {
		expect(isValidBio('Bio')).toBe(true);
	});

	it('should return true for a bio with exactly 255 characters', () => {
		const validBio = 'a'.repeat(255);
		expect(isValidBio(validBio)).toBe(true);
	});
});
