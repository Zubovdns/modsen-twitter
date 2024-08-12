import { styled } from 'styled-components';

export const AvatarContainer = styled.div`
	width: 46px;
	height: 46px;
	background-color: #cccccc;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	flex: 0 1 auto;

	border-radius: 30px;
`;

export const AvatarImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
