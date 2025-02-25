import { styled } from 'styled-components';

import { device } from '@constants/breakpoints';

export const HomeWrapper = styled.div`
	max-width: 600px;
	width: 600px;
	min-width: 600px;

	min-height: 100vh;

	border-right: 2px solid ${({ theme }) => theme.itemBorder};

	& > * > * {
		border-bottom: 2px solid ${({ theme }) => theme.itemBorder};
	}

	@media ${device.md} {
		width: 100%;
	}
`;

export const HomeContainer = styled.div`
	width: 100%;
`;

export const HeaderContainer = styled.header`
	width: 100%;
	height: 53px;
	padding: 0 20px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Title = styled.h1`
	color: ${({ theme }) => theme.textMain};
	font-size: 20px;
`;

export const PlaceholderContainer = styled.div`
	width: 100%;
	height: 600px;

	color: ${({ theme }) => theme.textMain};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	gap: 10px;
`;

export const PlaceholderTitle = styled.h2`
	font-size: 40px;
	text-align: center;
`;

export const PlaceholderText = styled.p`
	font-size: 20px;
	text-align: center;
	overflow-wrap: break-word;
`;
