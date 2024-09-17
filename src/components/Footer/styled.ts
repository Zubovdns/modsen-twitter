import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const FooterContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 1vw;

	height: 7vh;
`;

export const FooterLink = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.textMain};
	font-size: 13px;
	font-weight: 300;

	&:hover {
		text-decoration: underline;
	}
`;
