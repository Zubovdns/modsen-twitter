import { useEffect, useState } from 'react';

import { createContainer, Portal } from '../Portal';

import { NOTIFICATION_CONTAINER_ID } from './constants';
import { NotificationContainer, NotificationMessage } from './styled';
import { NotificationProps } from './types';

createContainer({ id: NOTIFICATION_CONTAINER_ID });

export const Notification = ({ message, duration }: NotificationProps) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	if (!show) return null;

	return (
		<Portal id={NOTIFICATION_CONTAINER_ID}>
			<NotificationContainer $duration={duration}>
				<NotificationMessage>{message}</NotificationMessage>
			</NotificationContainer>
		</Portal>
	);
};
