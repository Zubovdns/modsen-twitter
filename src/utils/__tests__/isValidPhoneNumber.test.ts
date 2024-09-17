import { isValidPhoneNumber } from '../isValidPhoneNumber';

describe('isValidPhoneNumber', () => {
	it('should return true for a valid phone number with country code', () => {
		expect(isValidPhoneNumber('+1 123 456 7890')).toBe(true);
	});

	it('should return true for a valid phone number without country code', () => {
		expect(isValidPhoneNumber('123-456-7890')).toBe(true);
	});

	it('should return true for a valid phone number with dots', () => {
		expect(isValidPhoneNumber('123.456.7890')).toBe(true);
	});

	it('should return "Invalid phone number" for a phone number with letters', () => {
		expect(isValidPhoneNumber('123-ABC-7890')).toBe('Invalid phone number');
	});

	it('should return "Invalid phone number" for an empty string', () => {
		expect(isValidPhoneNumber('')).toBe('Invalid phone number');
	});

	it('should return "Invalid phone number" for a phone number that is too short', () => {
		expect(isValidPhoneNumber('123-45')).toBe('Invalid phone number');
	});

	it('should return "Invalid phone number" for an invalid format', () => {
		expect(isValidPhoneNumber('++1--123--456')).toBe('Invalid phone number');
	});
});
