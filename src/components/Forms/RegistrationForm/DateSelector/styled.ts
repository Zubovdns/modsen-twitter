import { styled } from 'styled-components';

export const DateWrapper = styled.div`
	position: relative;
	margin: 10px 0;
`;

export const DateContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
`;

export const Label = styled.label`
	font-size: 14px;
	font-weight: bold;
	margin-top: 20px;
`;

export const Description = styled.p`
	font-size: 12px;
	color: ${({ theme }) => theme.dateSelectorDescription};
	margin-bottom: 10px;
`;

export const DateSelect = styled.select<{ $error: boolean }>`
	padding: 15px;
	font-size: 16px;
	border: 1px solid
		${({ $error, theme }) => ($error ? theme.error : theme.borderInput)};
	border-radius: 4px;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	color: ${({ theme }) => theme.textMain};
	background: ${({ theme }) => theme.backgroundMain};
	background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23999' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 10px center;
	background-size: 8px 10px;

	cursor: pointer;

	&:focus {
		border-color: ${({ theme }) => theme.focusInput};
		box-shadow: 0 0 0 1px ${({ theme }) => theme.focusInput};
		outline: none;
	}
`;

export const Option = styled.option``;

export const DefaultOption = styled.option``;

export const MonthSelect = styled(DateSelect)`
	grid-column: span 2;
`;
