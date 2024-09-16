import { FOOTER_LINKS } from '@constants/footer';

import { FooterContainer, FooterLink } from './styled';

export const Footer = () => (
	<FooterContainer>
		{FOOTER_LINKS.map((item) => (
			<FooterLink key={item.name} to={item.to}>
				{item.name}
			</FooterLink>
		))}
	</FooterContainer>
);
