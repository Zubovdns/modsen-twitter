import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	max-width: 500px;
`;

export const Title = styled.h1`
	width: 100%;
	font-size: 24px;
	margin-bottom: 10px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Logo = styled.img`
	margin: 20px;
`;

export const ValidationError = styled.p`
	color: ${({ theme }) => theme.errorRed};
	position: absolute;
	top: 100%;
	left: 0;
	font-size: 12px;
	margin-top: 4px;
`;

export const LinkTo = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.signUpLinkText};

	display: flex;
	justify-content: flex-end;
	align-items: center;

	&:hover {
		text-decoration: underline;
	}
`;
