import { FOOTER_LINKS } from '@src/constants/footer';

import { FooterContainer, FooterLink } from './styled';

const Footer = () => (
	<FooterContainer>
		{FOOTER_LINKS.map((item, index) => (
			<FooterLink key={index} to={item.to}>
				{item.name}
			</FooterLink>
		))}
	</FooterContainer>
);

export default Footer;
