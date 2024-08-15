import { styled } from 'styled-components';

export const MainLayoutWrapper = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
`;

export const PageWrapper = styled.div`
	min-width: 600px;
	width: 600px;
	max-width: 600px;
	min-height: 100vh;

	border-right: 2px solid #eff3f4;
	border-left: 2px solid #eff3f4;
`;

export const MainLayoutContainer = styled.main`
	display: flex;
	gap: 40px;

	flex: 2;
`;
