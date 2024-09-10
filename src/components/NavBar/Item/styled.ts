import { Link } from 'react-router-dom';
import { device } from '@constants/breakpoints';
import styled from 'styled-components';

export const ItemWrapper = styled.div`
	width: 250px;
	height: auto;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	@media ${device.lg} {
		width: auto;
	}
`;

export const ItemContainer = styled(Link)<{ $isActive: boolean }>`
	width: auto;
	height: 50px;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	padding: 12px;
	margin: 2px 0;

	border-radius: 30px;
	text-decoration: none;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.backgroundMainHover};
	}
`;

export const Icon = styled.img`
	width: 26px;
	height: 26px;
`;

export const Text = styled.span<{ $isActive: boolean }>`
	color: ${({ theme }) => theme.textMain};
	font-weight: ${({ $isActive }) => ($isActive ? 'bold' : '400')};
	font-size: 20px;
	margin: 0 20px;

	@media ${device.lg} {
		display: none;
	}
`;
