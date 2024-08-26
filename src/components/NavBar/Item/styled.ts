import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ItemContainer = styled(Link)<{ $isActive: boolean }>`
	width: auto;
	height: 50px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	padding: 12px;

	border-radius: 30px;
	text-decoration: none;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #e7e7e7;
	}
`;

export const Icon = styled.img`
	width: 26px;
	height: 26px;
`;

export const Text = styled.span<{ $isActive: boolean }>`
	color: black;
	font-weight: ${({ $isActive }) => ($isActive ? 'bold' : '400')};
	font-size: 20px;
	margin: 0 20px;
`;
