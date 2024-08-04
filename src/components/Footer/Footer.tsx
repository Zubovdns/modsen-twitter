import { FOOTER_LINKS } from '@constants/footer';

import { FooterContainer, FooterLink } from './styled';

export const Footer = () => (
	<FooterContainer>
		{FOOTER_LINKS.map((item, index) => (
			<FooterLink key={index} to={item.to}>
				{item.name}
			</FooterLink>
		))}
	</FooterContainer>
);
