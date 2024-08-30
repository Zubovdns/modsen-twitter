import styled from 'styled-components';

export const EditProfileContainer = styled.form`
	width: 600px;
	height: 600px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	background-color: white;
`;

export const EditHeaderContainer = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
`;

export const HiddenFileInput = styled.input.attrs({
	type: 'file',
	accept: 'image/*',
})`
	display: none;
`;

export const EditBannerImageContainer = styled.div`
	width: 100%;
	height: 100%;

	background-color: #cfd9de;

	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;
`;

export const EditProfileImageContainer = styled.div`
	position: absolute;

	bottom: 70px;
	left: 20px;

	width: 130px;
	height: 130px;

	border-radius: 50%;

	background-color: #f7f9f9;

	display: flex;
	align-items: center;
	justify-content: center;

	overflow: hidden;

	border: 3px solid #fff;

	position: relative;
`;

export const EditImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 0;
`;

export const EditImageButton = styled.button`
	width: 50px;
	height: 50px;

	position: absolute;

	padding: 10px;
	border-radius: 50%;

	border: none;
	cursor: pointer;

	background-color: rgba(0, 0, 0, 0.2);

	transition: background-color 0.2s ease;

	&:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
`;

export const EditImageIcon = styled.img``;

export const LoaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
`;

export const TextInformationContainer = styled.div`
	width: 100%;
	padding: 0 50px;
	margin-top: 60px;

	display: flex;
	flex-direction: column;
`;

export const SubmitButton = styled.button`
	color: white;
	background-color: black;

	border: none;
	border-radius: 20px;

	cursor: pointer;

	padding: 5px 15px;

	transition: background-color 0.2s ease;

	&:hover {
		background-color: #272c30;
	}
`;
