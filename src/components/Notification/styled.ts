import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
		from {
			bottom: -50px;
			opacity: 0;
		}

		to {
			bottom: 20px;
			opacity: 1;
		}
`;
const fadeOut = keyframes`
		from {
			bottom: 20px;
			opacity: 1;
		}

		to {
			bottom: -50px;
			opacity: 0;
		}
`;

export const NotificationContainer = styled.div<{ $duration: number }>`
	max-width: 400px;
	min-width: 50px;
	min-height: 45px;

	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	background-color: #01a9f4;
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	animation: ${fadeIn} 0.5s ease-out,
		${fadeOut} 0.5s ease-in
			${({ $duration }) => ($duration ? $duration / 1000 : 3) - 0.5}s forwards;
`;

export const NotificationMessage = styled.div`
	font-size: 16px;
`;
