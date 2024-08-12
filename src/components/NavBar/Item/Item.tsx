import { Icon, ItemContainer, Text } from './styled';
import { Props } from './types';

export const Item = ({ text, icon, to }: Props) => (
	<ItemContainer to={to}>
		<Icon src={icon} />
		<Text>{text}</Text>
	</ItemContainer>
);
