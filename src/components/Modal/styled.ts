import styled from 'styled-components';

export const ModalWrap = styled.div`
	position: fixed;

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
	max-width: 100vw;
	max-height: 80vh;

	position: relative;

	display: flex;
	flex-direction: column;

	overflow-y: auto;
	overflow-x: hidden;

	border-radius: 20px;
`;

export const ModalHeaderContainer = styled.div`
	width: 100%;
	max-height: 60px;
	display: flex;
	align-items: center;
	padding: 10px 10px;

	background-color: ${({ theme }) => theme.backgroundMain};
`;

export const ModalTitle = styled.h1`
	flex: 1;
	font-size: 25px;
	margin-left: 20px;

	color: ${({ theme }) => theme.textMain};
`;

export const ModalButtonContainer = styled.div``;

export const ModalCloseButton = styled.button`
	width: 30px;
	height: 30px;

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;

	outline: none;

	border: 0;
	border-radius: 50%;
	background: transparent;

	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.backgroundMainHover};
	}
`;

export const ModalCloseButtonIcon = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
