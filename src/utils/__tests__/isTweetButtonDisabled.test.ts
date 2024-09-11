import { isTweetButtonDisabled } from '../isTweetButtonDisabled';

describe('isTweetButtonDisabled', () => {
	it('should return true if text is empty and no image is uploading', () => {
		expect(isTweetButtonDisabled('', false)).toBe(true);
	});

	it('should return true if text is only whitespace and no image is uploading', () => {
		expect(isTweetButtonDisabled('   ', false)).toBe(true);
	});

	it('should return true if an image is uploading, regardless of text', () => {
		expect(isTweetButtonDisabled('Hello', true)).toBe(true);
		expect(isTweetButtonDisabled('', true)).toBe(true);
		expect(isTweetButtonDisabled('   ', true)).toBe(true);
	});

	it('should return false if text is not empty and no image is uploading', () => {
		expect(isTweetButtonDisabled('Hello, world!', false)).toBe(false);
	});
});
