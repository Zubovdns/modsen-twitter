import { isValidPassword } from '../isValidPassword';

describe('isValidPassword', () => {
	it('should return true for passwords with at least 8 characters', () => {
		expect(isValidPassword('password123')).toBe(true);
		expect(isValidPassword('abcdefgh')).toBe(true);
		expect(isValidPassword('A1b2C3d4')).toBe(true);
	});

	it('should return false for passwords shorter than 8 characters', () => {
		expect(isValidPassword('pass')).toBe(false);
		expect(isValidPassword('1234567')).toBe(false);
		expect(isValidPassword('abc123')).toBe(false);
	});

	it('should return true for passwords with exactly 8 characters', () => {
		expect(isValidPassword('12345678')).toBe(true);
		expect(isValidPassword('abcdEfgh')).toBe(true);
	});
});
