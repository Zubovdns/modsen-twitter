import styled from 'styled-components';

export const FloatingLabelInputWrapper = styled.div`
	position: relative;
	margin: 15px 0;
`;

export const FloatingLabelInput = styled.input<{ $error: boolean }>`
	padding: 18px;
	font-size: 16px;
	border: 1px solid
		${({ $error, theme }) => ($error ? theme.error : theme.borderInput)};
	border-radius: 4px;
	width: 100%;
	outline: none;
	box-sizing: border-box;

	color: ${({ theme }) => theme.textMain};

	background-color: ${({ theme }) => theme.backgroundMain};

	&::placeholder {
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	&:focus::placeholder {
		opacity: 1;
	}

	&:focus {
		border-color: ${({ $error, theme }) =>
			$error ? theme.error : theme.focusInput};
		box-shadow: 0 0 0 1px
			${({ $error, theme }) => ($error ? theme.error : theme.focusInput)};
	}

	&:focus + label,
	&:not(:placeholder-shown) + label {
		top: -1px;
		left: 10px;
		font-size: 12px;
		color: ${({ $error, theme }) => ($error ? theme.error : theme.focusInput)};
		background: ${({ theme }) => theme.backgroundMain};
		padding: 0 5px;
	}
`;

export const FloatingLabel = styled.label`
	position: absolute;
	top: 50%;
	left: 10px;
	transform: translateY(-50%);
	transition: all 0.2s;
	pointer-events: none;
	color: ${({ theme }) => theme.placeholder};
	background: transparent;
	padding: 0 5px;
`;

export const ValidationError = styled.p`
	color: ${({ theme }) => theme.error};
	position: absolute;
	top: 100%;
	left: 0;
	font-size: 12px;
	margin-top: 4px;
`;
