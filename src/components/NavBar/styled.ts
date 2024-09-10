import { device } from '@constants/breakpoints';
import { styled } from 'styled-components';

export const NavBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-start;

	position: sticky;
	top: 0px;

	border-right: 2px solid ${({ theme }) => theme.itemBorder};

	height: 100vh;

	flex: 1;

	padding: 0 5px;

	@media ${device.lg} {
		flex: 0;
	}
`;

export const ItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

export const Logo = styled.img`
	margin: 15px 0;
`;

export const TweetButton = styled.button`
	width: 230px;
	height: 50px;

	border: none;
	border-radius: 30px;

	margin: 15px 0;

	color: ${({ theme }) => theme.tweetButton};

	background-color: ${({ theme }) => theme.tweetButtonBg};

	cursor: pointer;

	font-size: 20px;
	font-weight: bold;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ theme }) => theme.tweetButtonHover};
	}

	@media ${device.lg} {
		width: 50px;
		height: 50px;

		margin: 0;
		padding: 0;

		font-size: 10px;
	}
`;

export const TweetInputWrapper = styled.div`
	width: 600px;

	padding: 0 10px 10px 10px;
`;
