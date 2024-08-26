import { styled } from 'styled-components';

export const NavBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-start;

	position: sticky;
	top: 0px;

	height: 100vh;

	flex: 1;
`;

export const ItemContainer = styled.div`
	width: 250px;

	padding-right: 30px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

export const Logo = styled.img`
	margin: 15px 0;
`;

export const TweetButton = styled.button`
	width: 100%;
	height: 50px;

	border: none;
	border-radius: 30px;

	margin: 15px 0;

	color: white;
	background-color: #1d9bf0;

	cursor: pointer;

	font-size: 20px;
	font-weight: bold;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #198cd8;
	}
`;
