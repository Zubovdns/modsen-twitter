export const getRelativeTime = (date: Date | string | number): string => {
	const now = new Date();
	const inputDate = new Date(date);
	const diffInSeconds = Math.floor(
		(now.getTime() - inputDate.getTime()) / 1000
	);

	const intervals = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	const getDateFormatted = (includeYear: boolean = false) =>
		inputDate.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			...(includeYear && { year: 'numeric' }),
		});

	if (diffInSeconds < intervals.minute) {
		return `${diffInSeconds}s`;
	}
	if (diffInSeconds < intervals.hour) {
		return `${Math.floor(diffInSeconds / intervals.minute)}m`;
	}
	if (diffInSeconds < intervals.day) {
		return `${Math.floor(diffInSeconds / intervals.hour)}h`;
	}
	if (diffInSeconds < intervals.month) {
		return `${Math.floor(diffInSeconds / intervals.day)}d`;
	}
	if (diffInSeconds < intervals.year) {
		return getDateFormatted();
	}

	const isSameYear = now.getFullYear() === inputDate.getFullYear();
	return getDateFormatted(!isSameYear);
};
