import styled from 'styled-components';

export const SearchContainer = styled.div`
	display: flex;
	align-items: center;
	background-color: #f1f4f6;
	border-radius: 25px;
	padding: 10px 20px;
	width: 100%;
	max-width: 400px;
`;

export const SearchImage = styled.img`
	margin-right: 10px;
	width: 18px;
`;

export const SearchInput = styled.input`
	border: none;
	background-color: transparent;
	color: #6e7a82;
	font-size: 16px;
	width: 100%;
	outline: none;

	&::placeholder {
		color: #6e7a82;
	}
`;
