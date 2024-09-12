import { requiredField } from '@utils/requiredField';

describe('requiredField', () => {
	it('should return true for a non-empty string', () => {
		expect(requiredField({ trim: () => 'Valid input' })).toBe(true);
	});

	it('should return true for a string with spaces but valid content', () => {
		expect(requiredField({ trim: () => '  Valid input  ' })).toBe(true);
	});

	it('should return "This field is required" for an empty string', () => {
		expect(requiredField({ trim: () => '' })).toBe('This field is required');
	});

	it('should return "This field is required" for an empty object', () => {
		expect(requiredField({ trim: () => '' })).toBe('This field is required');
	});
});
