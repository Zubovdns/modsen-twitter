import {
	MouseEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import CloseIcon from '@assets/icons/Modal/CloseIcon.svg';
import { createContainer, Portal } from '@components/Portal';

import { MODAL_CONTAINER_ID } from './constants';
import {
	ModalCloseButton,
	ModalCloseButtonIcon,
	ModalContent,
	ModalWrap,
} from './styled';
import { ModalProps } from './types';

export const Modal = ({ onClose, children }: ModalProps) => {
	const [isMounted, setMounted] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		createContainer({ id: MODAL_CONTAINER_ID });
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			const { target } = event;

			if (target instanceof Node && rootRef.current === target) {
				onClose?.();
			}
		};

		const handleEscapePress = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('click', handleWrapperClick);
		window.addEventListener('keydown', handleEscapePress);

		return () => {
			window.removeEventListener('click', handleWrapperClick);
			window.removeEventListener('keydown', handleEscapePress);
		};
	}, [onClose]);

	const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
		(e) => {
			e.stopPropagation();
			onClose?.();
		},
		[onClose]
	);

	if (!isMounted) return null;
	return (
		<Portal id={MODAL_CONTAINER_ID}>
			<ModalWrap ref={rootRef}>
				<ModalContent>
					<ModalCloseButton onClick={handleClose}>
						<ModalCloseButtonIcon src={CloseIcon} />
					</ModalCloseButton>
					{children}
				</ModalContent>
			</ModalWrap>
		</Portal>
	);
};
