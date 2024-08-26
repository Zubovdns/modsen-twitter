export const getRelativeTime = (date: Date | string | number): string => {
	const now = new Date();
	const inputDate = new Date(date);
	const diffInSeconds = Math.floor(
		(now.getTime() - inputDate.getTime()) / 1000
	);

	const intervals: { [key: string]: number } = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	if (diffInSeconds < intervals.minute) {
		return `${diffInSeconds}s`;
	} else if (diffInSeconds < intervals.hour) {
		return `${Math.floor(diffInSeconds / intervals.minute)}m`;
	} else if (diffInSeconds < intervals.day) {
		return `${Math.floor(diffInSeconds / intervals.hour)}h`;
	} else if (diffInSeconds < intervals.month) {
		return `${Math.floor(diffInSeconds / intervals.day)}d`;
	} else if (diffInSeconds < intervals.year) {
		return inputDate.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	} else {
		const isSameYear = now.getFullYear() === inputDate.getFullYear();
		return inputDate.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: isSameYear ? undefined : 'numeric',
		});
	}
};
