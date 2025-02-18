import { styled } from 'styled-components';

import { device } from '@constants/breakpoints';

export const SearchPanelWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;

	padding: 4px 0;

	position: sticky;
	top: 0px;
	align-self: start;

	margin-right: 10px;

	@media ${device.lg} {
		display: none;
	}
`;
export const ContentContainer = styled.div`
	width: 350px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;

export const Placeholder = styled.div`
	width: 100%;
	height: 100vh;

	background-color: gray;
`;
