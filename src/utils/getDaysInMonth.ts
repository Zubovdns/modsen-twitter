import { months } from '@components/Forms/RegistrationForm/constants';

export const getDaysInMonth = (month: string, year: number) => {
	const monthIndex = months.indexOf(month);
	const date = new Date(year, monthIndex + 1, 0);
	return Array.from({ length: date.getDate() }, (_, i) => i + 1);
};
