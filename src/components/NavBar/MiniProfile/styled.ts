import styled from 'styled-components';

import { device } from '@constants/breakpoints';

export const ProfileWrapper = styled.div`
	width: 240px;
	height: auto;

	padding: 10px;
	margin-top: 20px;
	margin-right: 10px;

	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 30px;

	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.backgroundMainHover};
	}

	@media ${device.lg} {
		width: auto;
		margin: 10px 0;
		padding: 0;
	}
`;

export const TextContainer = styled.div`
	height: auto;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	flex: 1;

	padding: 0 10px;

	@media ${device.lg} {
		display: none;
	}
`;

export const UserLoginName = styled.p`
	font-size: 15px;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	width: 124px;
	max-width: 124px;
`;

export const UserName = styled(UserLoginName)`
	font-size: 16px;
	font-weight: bold;
`;

export const ExitImage = styled.div`
	background-color: inherit;
	border: none;

	display: flex;
	align-items: center;
	justify-content: center;

	flex: 0 1 auto;
	width: 30px;

	@media ${device.lg} {
		display: none;
	}
`;
