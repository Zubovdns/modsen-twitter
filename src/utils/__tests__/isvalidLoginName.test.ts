import { isValidLoginName } from '../isValidLoginName';

describe('isValidLoginName', () => {
	it('should return true for valid login names', () => {
		expect(isValidLoginName('User123')).toBe(true);
		expect(isValidLoginName('loginName')).toBe(true);
		expect(isValidLoginName('USER123')).toBe(true);
	});

	it('should return an error for login names shorter than 3 characters', () => {
		expect(isValidLoginName('ab')).toBe(
			'Login name must be 3 - 15 characters long'
		);
	});

	it('should return an error for login names longer than 15 characters', () => {
		expect(isValidLoginName('thisIsAVeryLongLogin')).toBe(
			'Login name must be 3 - 15 characters long'
		);
	});

	it('should return an error for login names containing special characters', () => {
		expect(isValidLoginName('user!name')).toBe(
			'Login can contain only numbers and letters of any case'
		);
		expect(isValidLoginName('login_name')).toBe(
			'Login can contain only numbers and letters of any case'
		);
		expect(isValidLoginName('user.name')).toBe(
			'Login can contain only numbers and letters of any case'
		);
	});

	it('should return an error for login names with spaces', () => {
		expect(isValidLoginName('user name')).toBe(
			'Login can contain only numbers and letters of any case'
		);
	});

	it('should return true for login names with exactly 3 or 15 characters', () => {
		expect(isValidLoginName('abc')).toBe(true);
		expect(isValidLoginName('123456789012345')).toBe(true);
	});
});
