import { styled } from 'styled-components';

export const Switch = styled.div<{ checked: boolean }>`
	width: 50px;
	height: 25px;
	border-radius: 25px;
	background-color: ${({ theme }) => theme.themeSwitcherBg};
	position: relative;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:before {
		content: '';
		position: absolute;
		top: 2px;
		left: ${({ checked }) => (checked ? '26px' : '2px')};
		width: 21px;
		height: 21px;
		border-radius: 50%;
		background-color: ${({ theme }) => theme.themeSwitcher};
		transition: left 0.3s ease;
	}
`;
