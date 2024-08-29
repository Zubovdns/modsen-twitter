import styled from 'styled-components';

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
