import { isValidEmail } from '../isValidEmail';

describe('isValidEmail', () => {
	it('should return true for a valid email address', () => {
		expect(isValidEmail('test@example.com')).toBe(true);
		expect(isValidEmail('user.name+tag@domain.co')).toBe(true);
		expect(isValidEmail('firstname.lastname@sub.domain.org')).toBe(true);
	});

	it('should return an error message for an email without "@" symbol', () => {
		expect(isValidEmail('invalidemail.com')).toBe('Invalid email address');
	});

	it('should return an error message for an email without domain part', () => {
		expect(isValidEmail('user@')).toBe('Invalid email address');
	});

	it('should return an error message for an email with invalid domain', () => {
		expect(isValidEmail('user@domain')).toBe('Invalid email address');
		expect(isValidEmail('user@domain.c')).toBe('Invalid email address');
	});

	it('should return an error message for an email with invalid characters', () => {
		expect(isValidEmail('user@domain@domain.com')).toBe(
			'Invalid email address'
		);
		expect(isValidEmail('user@domain,com')).toBe('Invalid email address');
	});

	it('should return an error message for an empty email string', () => {
		expect(isValidEmail('')).toBe('Invalid email address');
	});
});
