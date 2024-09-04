import { ReactNode } from 'react';

export type ModalProps = {
	onClose?: () => void;
	children?: React.ReactNode;
	title?: string;
	button?: ReactNode;
};
