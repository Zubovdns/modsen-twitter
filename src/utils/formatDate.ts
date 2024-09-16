import { Timestamp } from 'firebase/firestore';

export const formattedDate = (date: Timestamp) =>
	date.toDate().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
