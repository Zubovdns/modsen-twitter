import { styled } from 'styled-components';

export const ProfileWrapper = styled.div`
	min-width: 600px;
	width: 600px;
	max-width: 600px;
	min-height: 100vh;

	border-right: 2px solid #eff3f4;

	& > * > * {
		border-bottom: 2px solid #eff3f4;
	}
`;

export const ProfileContainer = styled.div`
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
	font-size: 20px;
`;
