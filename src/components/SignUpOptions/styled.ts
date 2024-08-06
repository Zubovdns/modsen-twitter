import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	padding: 0 30px;
`;

export const Logo = styled.img`
	object-fit: cover;
	object-position: center;
	width: 70px;
`;

export const Icon = styled.img`
	width: 20px;
	margin: 0 5px;
`;

export const Title = styled.h1`
	font-size: 70px;
	margin: 25px 0;
`;
export const Subtitle = styled.h2`
	font-size: 35px;
	margin: 10px 0;
`;

export const SignUpButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	width: 300px;

	margin: 10px 0;

	padding: 10px 20px;
	border: 1px solid ${({ theme }) => theme.signUpButtonBorder};
	border-radius: 50px;
	box-shadow: none;
	background-color: ${({ theme }) => theme.signUpButtonBg};
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.signUpButtonHoverBg};
	}
`;

export const Disclaimer = styled.p`
	width: 300px;
	font-size: 12px;
	font-weight: 400;

	margin: 5px 0;
`;

export const DisclaimerLink = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.signUpLinkText};

	&:hover {
		text-decoration: underline;
	}
`;
