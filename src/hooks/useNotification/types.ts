export type NotificationHook = {
	showNotification: (message: string, duration?: number) => void;
	NotificationComponent: React.FC;
};
