import { getDaysInMonth } from '../getDaysInMonth';

describe('getDaysInMonth', () => {
	test('должен возвращать 31 день для января 2023', () => {
		const days = getDaysInMonth('January', 2023);
		expect(days).toHaveLength(31);
		expect(days).toContain(1);
		expect(days).toContain(31);
	});

	test('должен возвращать 28 дней для февраля 2023 (не високосный год)', () => {
		const days = getDaysInMonth('February', 2023);
		expect(days).toHaveLength(28);
		expect(days).toContain(1);
		expect(days).toContain(28);
	});

	test('должен возвращать 29 дней для февраля 2024 (високосный год)', () => {
		const days = getDaysInMonth('February', 2024);
		expect(days).toHaveLength(29);
		expect(days).toContain(1);
		expect(days).toContain(29);
	});

	test('должен возвращать 30 дней для апреля 2023', () => {
		const days = getDaysInMonth('April', 2023);
		expect(days).toHaveLength(30);
		expect(days).toContain(1);
		expect(days).toContain(30);
	});

	test('должен корректно обрабатывать декабрь', () => {
		const days = getDaysInMonth('December', 2023);
		expect(days).toHaveLength(31);
		expect(days).toContain(1);
		expect(days).toContain(31);
	});

	test('должен корректно обрабатывать месяц с 30 днями', () => {
		const monthsWith30Days = ['April', 'June', 'September', 'November'];
		monthsWith30Days.forEach((month) => {
			const days = getDaysInMonth(month, 2023);
			expect(days).toHaveLength(30);
			expect(days).toContain(1);
			expect(days).toContain(30);
		});
	});

	test('должен корректно обрабатывать месяц с 31 днем', () => {
		const monthsWith31Days = [
			'January',
			'March',
			'May',
			'July',
			'August',
			'October',
			'December',
		];
		monthsWith31Days.forEach((month) => {
			const days = getDaysInMonth(month, 2023);
			expect(days).toHaveLength(31);
			expect(days).toContain(1);
			expect(days).toContain(31);
		});
	});
});
