import { styled } from 'styled-components';

export const Button = styled.button`
	padding: 10px;
	margin: 20px 0;
	background-color: ${({ theme }) => theme.focusInput};
	color: ${({ theme }) => theme.textMain};
	font-size: 16px;
	border: none;
	border-radius: 20px;
	cursor: pointer;

	height: 40px;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: ${({ theme }) => theme.submitButtonHover};
	}
`;
