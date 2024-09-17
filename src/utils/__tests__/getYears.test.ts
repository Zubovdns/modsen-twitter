import { getYears } from '../getYears';

describe('getYears', () => {
	it('should return an array of years from the current year to 1900', () => {
		const currentYear = new Date().getFullYear();
		const years = getYears();

		expect(years.length).toBe(currentYear - 1900 + 1);
		expect(years[0]).toBe(currentYear);
		expect(years[years.length - 1]).toBe(1900);
	});

	it('should include 1900 as the last year', () => {
		const years = getYears();
		expect(years).toContain(1900);
	});

	it('should return an array with the current year as the first element', () => {
		const currentYear = new Date().getFullYear();
		const years = getYears();

		expect(years[0]).toBe(currentYear);
	});

	it('should return a decreasing order of years', () => {
		const years = getYears();

		for (let i = 1; i < years.length; i++) {
			expect(years[i]).toBeLessThan(years[i - 1]);
		}
	});
});
