import { styled } from 'styled-components';

export const HomeContainer = styled.div`
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

export const UserTweetContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;

	padding: 4px 16px;
`;

export const UserTweetAvatarWrapper = styled.div`
	width: auto;
	height: 100%;

	padding-top: 12px;
	margin-right: 6px;
`;

export const AvatarContainer = styled.div`
	width: 44px;
	height: 44px;
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

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;

	flex: 1;
`;

export const Input = styled.input`
	padding: 17px 0;

	border: none;
	background-color: transparent;
	color: #16202c;
	outline: none;

	font-size: 24px;

	&::placeholder {
		color: #6e7a82;
	}
`;

export const InputOptions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-right: 10px;

	width: 100%;
	height: 48px;
`;

export const OptionsGroup = styled.div`
	display: flex;
`;

export const OptionButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 36px;
	height: 36px;

	background-color: inherit;
	border: none;
	border-radius: 30px;

	cursor: pointer;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #ebf5fe;
	}
`;

export const OptionIcon = styled.img`
	width: 20px;
`;

export const TweetButton = styled.button`
	height: 36px;

	border: none;
	border-radius: 30px;

	padding: 0 30px;

	color: white;
	background-color: #1d9bf0;

	cursor: pointer;

	font-size: 18px;
	font-weight: bold;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #198cd8;
	}
`;

export const PlaceholderContainer = styled.div`
	width: 100%;
	height: 600px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	gap: 10px;
`;

export const PlaceholderTitle = styled.h2`
	font-size: 40px;
	text-align: center;
`;

export const PlaceholderText = styled.p`
	font-size: 20px;
	text-align: center;
`;
