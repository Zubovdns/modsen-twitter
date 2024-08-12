import { styled } from 'styled-components';

export const NavBarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;

	width: 300px;
	height: 100vh;
	border-right: 1px solid black;

	padding: 30px;
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
