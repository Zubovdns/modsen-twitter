import { useCallback, useState } from 'react';
import { Notification } from '@components/Notification';

import { NotificationHook } from './types';

export const useNotification = (): NotificationHook => {
	const [notification, setNotification] = useState<{
		message: string;
		duration: number;
	} | null>(null);

	const showNotification = useCallback(
		(message: string, duration: number = 3000) => {
			setNotification({ message, duration });
			setTimeout(() => {
				setNotification(null);
			}, duration);
		},
		[]
	);

	const NotificationComponent = () =>
		notification ? (
			<Notification
				message={notification.message}
				duration={notification.duration}
			/>
		) : null;

	return { showNotification, NotificationComponent };
};
