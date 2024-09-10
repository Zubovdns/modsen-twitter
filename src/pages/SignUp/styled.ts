import { device } from '@constants/breakpoints';
import styled from 'styled-components';

export const SignUpContainer = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	flex-direction: column;

	overflow: hidden;

	@media ${device.lg} {
		justify-content: space-between;
	}
`;

export const ContentContainer = styled.div`
	width: 100vw;
	display: flex;
	overflow: hidden;

	@media ${device.lg} {
		height: 100%;
		align-items: center;
		justify-content: center;
	}
`;

export const Image = styled.img`
	object-fit: cover;
	object-position: center;

	width: 1000px;

	@media ${device.lg} {
		display: none;
	}
`;
