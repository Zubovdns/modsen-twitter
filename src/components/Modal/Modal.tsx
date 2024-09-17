import {
	MouseEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import { CloseIcon } from '@assets/icons/Modal/CloseIcon';
import { createContainer, Portal } from '@components/Portal';

import { MODAL_CONTAINER_ID } from './constants';
import {
	ModalButtonContainer,
	ModalCloseButton,
	ModalContent,
	ModalHeaderContainer,
	ModalTitle,
	ModalWrap,
} from './styled';
import { ModalProps } from './types';

export const Modal = ({ onClose, children, title, button }: ModalProps) => {
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
					<ModalHeaderContainer>
						<ModalCloseButton onClick={handleClose}>
							<CloseIcon />
						</ModalCloseButton>
						{title && <ModalTitle>{title}</ModalTitle>}
						{button && <ModalButtonContainer>{button}</ModalButtonContainer>}
					</ModalHeaderContainer>
					{children}
				</ModalContent>
			</ModalWrap>
		</Portal>
	);
};
