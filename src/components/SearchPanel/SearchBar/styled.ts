import styled from 'styled-components';

export const SearchContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => theme.searchBarBg};
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
	color: ${({ theme }) => theme.textMain};
	font-size: 16px;
	width: 100%;
	outline: none;

	&::placeholder {
		color: ${({ theme }) => theme.placeholder};
	}
`;

export const DropdownList = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: ${({ theme }) => theme.backgroundMain};
	box-shadow: 0px 0px 4px gray;
	border-radius: 10px;
	margin-top: 8px;
	max-height: 300px;
	overflow-y: auto;
	z-index: 10;
`;

export const EmptyMessage = styled.div`
	padding: 10px;
	text-align: center;
	color: ${({ theme }) => theme.subtext};
`;
