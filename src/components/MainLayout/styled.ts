import { styled } from 'styled-components';

import { device } from '@constants/breakpoints';

export const MainLayoutWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;

	&::before,
	&::after {
		content: '';
		flex: 1;
	}
`;

export const MainLayoutContainer = styled.main`
	display: flex;
	gap: 10px;

	flex: 2.5;

	@media ${device.lg} {
		flex: 0;
		gap: 0;
		width: 100%;
	}
`;
