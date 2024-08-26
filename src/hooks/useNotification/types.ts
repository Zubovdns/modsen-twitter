export type NotificationHook = [
	(message: string, duration?: number) => void,
	React.FC
];
