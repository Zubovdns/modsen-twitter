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
	background: white;

	overflow-y: auto;
	overflow-x: hidden;

	border-radius: 20px;
`;

export const ModalCloseButton = styled.button`
	position: absolute;
	top: 10px;
	left: 10px;

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
		background-color: #e6e7e7;
	}
`;

export const ModalCloseButtonIcon = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
