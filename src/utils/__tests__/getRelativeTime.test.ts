import { getRelativeTime } from '../getRelativeTime';

describe('getRelativeTime', () => {
	const now = new Date(2024, 8, 11, 12, 0, 0);
	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(now);
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should return seconds if the time difference is less than a minute', () => {
		const date = new Date(now.getTime() - 30 * 1000);
		expect(getRelativeTime(date)).toBe('30s');
	});

	it('should return minutes if the time difference is less than an hour', () => {
		const date = new Date(now.getTime() - 5 * 60 * 1000);
		expect(getRelativeTime(date)).toBe('5m');
	});

	it('should return hours if the time difference is less than a day', () => {
		const date = new Date(now.getTime() - 3 * 60 * 60 * 1000);
		expect(getRelativeTime(date)).toBe('3h');
	});

	it('should return days if the time difference is less than a month', () => {
		const date = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
		expect(getRelativeTime(date)).toBe('5d');
	});

	it('should return the date in "MMM d" format if the time difference is less than a year', () => {
		const date = new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000);
		expect(getRelativeTime(date)).toBe('Aug 2');
	});

	it('should return the date in "MMM d, yyyy" format if the time difference is more than a year', () => {
		const date = new Date(2023, 7, 15);
		expect(getRelativeTime(date)).toBe('Aug 15, 2023');
	});

	it('should handle date as a string input', () => {
		const date = '2024-09-11T08:00:00Z';
		expect(getRelativeTime(date)).toBe('1h');
	});

	it('should handle date as a number input (timestamp)', () => {
		const timestamp = now.getTime() - 60 * 60 * 1000;
		expect(getRelativeTime(timestamp)).toBe('1h');
	});
});
