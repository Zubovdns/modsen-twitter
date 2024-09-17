import { isValidName } from '../isValidName';

describe('isValidName', () => {
	it('should return true for valid names with at least 3 characters', () => {
		expect(isValidName('John')).toBe(true);
		expect(isValidName('Alice')).toBe(true);
		expect(isValidName('Bob')).toBe(true);
	});

	it('should return an error for names shorter than 3 characters', () => {
		expect(isValidName('Al')).toBe('Name must be at least 3 characters long');
	});

	it('should return an error for names containing only whitespace', () => {
		expect(isValidName('   ')).toBe('Name must be at least 3 characters long');
	});

	it('should return true for names with exactly 3 characters', () => {
		expect(isValidName('Sam')).toBe(true);
	});

	it('should ignore leading and trailing whitespace', () => {
		expect(isValidName('  John  ')).toBe(true);
		expect(isValidName('  Al  ')).toBe(
			'Name must be at least 3 characters long'
		);
	});
});
