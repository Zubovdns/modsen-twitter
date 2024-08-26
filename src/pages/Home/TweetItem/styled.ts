import { styled } from 'styled-components';

export const TweetItemContainer = styled.div`
	display: flex;
	width: 100%;
	padding: 12px 16px;
	position: relative;
`;

export const AvatarWrapper = styled.div`
	width: auto;
	height: 100%;
	margin-right: 8px;
`;

export const AvatarContainer = styled.div`
	width: 40px;
	height: 40px;
	background-color: #cccccc;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
`;

export const Avatar = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	flex: 1;
`;

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	position: relative;
`;

export const HeaderDataContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	& > *:not(:last-child)::after {
		content: '·';
		color: #536471;
		margin-left: 3px;
		margin-right: 3px;
	}
`;

export const TweetUser = styled.h2`
	font-weight: bold;
	font-size: 18px;
`;

export const TweetUserLogin = styled.p`
	font-size: 18px;
	color: #536471;
`;

export const TweetDate = styled.p`
	font-size: 18px;
	color: #536471;
`;

export const TextContainer = styled.div`
	width: 100%;
	word-wrap: break-word;
	overflow-wrap: break-word;
`;

export const Text = styled.p`
	font-size: 18px;
	word-break: break-word;
	overflow-wrap: break-word;
`;

export const ImageContainer = styled.div`
	width: 100%;
	min-height: 100px;
	max-height: 500px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background-color: #f0f0f0;
	overflow: hidden;
	border-radius: 20px;
`;

export const Image = styled.img`
	width: 100%;
	height: auto;
	object-fit: contain;
`;

export const Options = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 10px;
`;

export const LikesCount = styled.span`
	margin-left: 8px;
	font-size: 16px;
	color: #536471;
	transition: color 0.2s ease;
`;

export const LikeButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 35px;
	height: 35px;

	background-color: inherit;
	border: none;
	border-radius: 50%;

	cursor: pointer;

	position: relative;
	transition: background-color 0.2s ease, box-shadow 0.2s ease;
`;

export const LikesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: box-shadow 0.2s ease, color 0.2s ease;

	&:hover ${LikeButton} {
		box-shadow: 0 0 20px rgba(249, 227, 235, 0.7);
		background-color: #f9e3eb;
	}

	&:hover ${LikesCount} {
		color: red;
	}
`;

export const MoreButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	background-color: inherit;
	border: none;

	height: 100%;
	cursor: pointer;
	position: relative;
`;

export const MoreMenu = styled.div`
	position: absolute;
	top: 0%;
	right: 0;
	background-color: white;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	overflow: hidden;
	z-index: 10;
`;

export const MoreMenuItem = styled.div`
	padding: 7px 16px;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: #f0f0f0;
	}
`;
