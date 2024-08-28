import { styled } from 'styled-components';

export const ProfileWrapper = styled.div`
	min-width: 600px;
	width: 600px;
	max-width: 600px;
	min-height: 100vh;

	border-right: 2px solid #eff3f4;

	& > * > * {
		border-bottom: 2px solid #eff3f4;
	}
`;

export const ProfileContainer = styled.div`
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

export const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const Title = styled.h1`
	font-size: 20px;
`;

export const NumberOfPosts = styled.p`
	color: #536471;
	font-size: 13px;
`;

export const ProfileHeaderContainer = styled.div`
	width: 100%;
`;

export const BannerWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 200px;
`;

export const BannerImageContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #ccc;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const BannerImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const ProfileImageContainer = styled.div`
	position: absolute;
	bottom: -60px;
	left: 20px;
	border-radius: 50%;
	width: 130px;
	height: 130px;
	background-color: #ccc;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border: 3px solid #fff;
`;

export const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const EditButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: flex-start;

	padding: 10px 10px;
`;

export const EditButton = styled.button`
	padding: 6px 14px;
	font-size: 16px;
	left: 1000px;
	color: #333;
	font-weight: bold;

	background-color: inherit;
	border: 1px solid #ccc;
	border-radius: 30px;
	cursor: pointer;

	&:hover {
		background-color: #d4d9dd;
	}
`;

export const TextContainer = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	gap: 10px;

	padding: 10px 20px;
`;

export const UsernameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const Name = styled.h2`
	font-size: 20px;
`;

export const Username = styled.p`
	font-size: 15px;
	color: #536471;
`;

export const Bio = styled.p`
	font-size: 15px;
`;

export const Info = styled.p`
	font-size: 15px;
	color: #aaa;
`;

export const FollowInfo = styled.p`
	font-size: 14px;
	color: #333;
`;
