import styled from 'styled-components';

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	max-width: 500px;
`;

export const Title = styled.h1`
	width: 100%;
	font-size: 24px;
	margin-bottom: 10px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Label = styled.label`
	font-size: 14px;
	font-weight: bold;
	margin-top: 20px;
`;

export const Description = styled.p`
	font-size: 12px;
	color: #555;
	margin-bottom: 10px;
`;

export const DateWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	margin: 10px 0;
`;

export const DateSelect = styled.select<{ $error: boolean }>`
	padding: 15px;
	font-size: 16px;
	border: 1px solid ${({ $error }) => ($error ? '#F00' : '#ccc')};
	border-radius: 4px;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	background: white;
	background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23999' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 10px center;
	background-size: 8px 10px;

	cursor: pointer;

	&:focus {
		border-color: #1da1f2;
		box-shadow: 0 0 0 1px #1da1f2;
		outline: none;
	}
`;

export const Option = styled.option``;

export const DefaultOption = styled.option``;

export const MonthSelect = styled(DateSelect)`
	grid-column: span 2;
`;

export const Button = styled.button`
	padding: 10px;
	margin: 20px 0;
	background-color: #1da1f2;
	color: white;
	font-size: 16px;
	border: none;
	border-radius: 20px;
	cursor: pointer;

	height: 40px;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: #0d8ddb;
	}
`;

export const Logo = styled.img`
	margin: 20px;
`;

export const ValidationError = styled.p`
	color: #f00;
	position: absolute;
	top: 100%;
	left: 0;
	font-size: 12px;
	margin-top: 4px;
`;
