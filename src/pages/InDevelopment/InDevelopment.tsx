import { DESCRIPTION, TITLE } from './constants';
import { Description, InDevelopmentContainer, Title } from './styled';

export const InDevelopment = () => (
	<InDevelopmentContainer>
		<Title>{TITLE}</Title>
		<Description>{DESCRIPTION}</Description>
	</InDevelopmentContainer>
);
