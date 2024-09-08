import { useLocation } from 'react-router-dom';

import { Icon, ItemContainer, ItemWrapper, Text } from './styled';
import { Props } from './types';

export const Item = ({ text, icon, to }: Props) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<ItemWrapper>
			<ItemContainer to={to} $isActive={isActive}>
				<Icon src={icon} />
				<Text $isActive={isActive}>{text}</Text>
			</ItemContainer>
		</ItemWrapper>
	);
};
