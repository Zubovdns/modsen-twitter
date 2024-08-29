import styled from 'styled-components';

export const SearchContainer = styled.div`
	position: relative;
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
	color: black;
	font-size: 16px;
	width: 100%;
	outline: none;

	&::placeholder {
		color: #6e7a82;
	}
`;

export const DropdownList = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	margin-top: 8px;
	max-height: 300px;
	overflow-y: auto;
	z-index: 10;
`;

export const DropdownItem = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #f1f4f6;
	}
`;

export const ItemImageContainer = styled.div`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	margin-right: 10px;

	background-color: #ccc;
	overflow: hidden;
`;

export const ItemImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const ItemTextContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ItemName = styled.span`
	font-size: 16px;
	font-weight: bold;
`;

export const ItemLogin = styled.span`
	font-size: 14px;
	color: #6e7a82;
`;

export const EmptyMessage = styled.div`
	padding: 10px;
	text-align: center;
	color: #6e7a82;
`;
