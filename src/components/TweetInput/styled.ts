import styled from 'styled-components';

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
	background-color: ${({ theme }) => theme.avatarContainer};
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

export const InputForm = styled.form`
	display: flex;
	flex-direction: column;

	flex: 1;
`;

export const Input = styled.input`
	padding: 17px 0;

	border: none;
	background-color: transparent;
	color: ${({ theme }) => theme.normalText};
	outline: none;

	font-size: 24px;

	&::placeholder {
		color: ${({ theme }) => theme.textPlaceholder};
	}
`;

export const InputOptions = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding-right: 10px;
	margin-top: 8px;

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
		background-color: ${({ theme }) => theme.tweetInputOptionsHover};
	}
`;

export const OptionIcon = styled.img`
	cursor: pointer;
	width: 20px;
`;

export const TweetButton = styled.button<{ disabled: boolean }>`
	background-color: ${({ disabled, theme }) =>
		disabled ? theme.tweetButtonHoverDisable : theme.tweetButtonBg};
	color: ${({ theme }) => theme.tweetButton};
	border: none;
	padding: 8px 30px;
	border-radius: 20px;
	cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	font-weight: bold;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ disabled, theme }) =>
			disabled ? theme.tweetButtonHoverDisable : theme.tweetButtonHover};
	}
`;

export const ImageContainer = styled.div`
	width: 100%;
	min-height: 100px;
	max-height: 685px;

	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	background-color: ${({ theme }) => theme.imagePreview};

	overflow: hidden;

	border-radius: 20px;
`;

export const ImagePreview = styled.img`
	width: 100%;
	height: auto;
	object-fit: contain;
`;

export const HiddenFileInput = styled.input.attrs({
	type: 'file',
	accept: 'image/*',
})`
	display: none;
`;

export const LoadingSpinner = styled.div`
	width: 50px;
	height: 50px;
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-top: 4px solid #3498db;
	border-radius: 50%;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

export const DeleteIcon = styled.img`
	position: absolute;
	width: 30px;
	height: 30px;
	top: 10px;
	right: 10px;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	padding: 7px;
	cursor: pointer;
	z-index: 10;
`;
