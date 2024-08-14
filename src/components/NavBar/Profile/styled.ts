import styled from 'styled-components';

export const ProfileWrapper = styled.div`
	width: 100%;
	height: auto;

	padding: 10px;
	margin-top: 20px;

	display: flex;
	align-items: center;
	justify-content: center;
`;

export const TextContainer = styled.div`
	height: auto;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	flex: 1;

	padding: 0 10px;
`;

export const UserName = styled.p`
	font-size: 16px;
	font-weight: bold;
`;

export const UserLoginName = styled.p`
	font-size: 15px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	max-width: 107px;
`;

export const ExitButton = styled.button`
	background-color: inherit;
	border: none;
	border-radius: 30px;
	padding: 8px;

	flex: 0 1 auto;

	cursor: pointer;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #e7e7e7;
	}
`;

export const ExitImage = styled.img`
	width: 30px;
`;
