import styled from 'styled-components';

export const FloatingLabelInputWrapper = styled.div`
	position: relative;
	margin: 15px 0;
`;

export const FloatingLabelInput = styled.input<{ $error: boolean }>`
	padding: 10px;
	font-size: 16px;
	border: 1px solid ${({ $error }) => ($error ? '#F00' : '#ccc')};
	border-radius: 4px;
	width: 100%;
	outline: none;
	box-sizing: border-box;
	&::placeholder {
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	&:focus::placeholder {
		opacity: 1;
	}
	&:focus {
		border-color: #1da1f2;
		box-shadow: 0 0 0 1px #1da1f2;
	}
	&:focus + label,
	&:not(:placeholder-shown) + label {
		top: -1px;
		left: 10px;
		font-size: 12px;
		color: ${({ $error }) => ($error ? '#F00' : '#1da1f2')};
		background: white;
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
	color: #999;
	background: transparent;
	padding: 0 5px;
`;

export const ValidationError = styled.p`
	color: #f00;
	position: absolute;
	top: 100%;
	left: 0;
	font-size: 12px;
	margin-top: 4px;
`;
