import { useLocation } from 'react-router-dom';

import { ItemContainer, Text } from './styled';
import { Props } from './types';

export const Item = ({ text, Icon, to }: Props) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<ItemContainer to={to} $isActive={isActive}>
			<Icon selected={isActive} />
			<Text $isActive={isActive}>{text}</Text>
		</ItemContainer>
	);
};
