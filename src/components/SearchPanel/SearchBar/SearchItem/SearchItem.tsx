import { useNavigate } from 'react-router-dom';

import {
	DropdownItem,
	ItemImage,
	ItemImageContainer,
	ItemLogin,
	ItemName,
	ItemTextContainer,
} from './styled';
import { SearchItemProps } from './types';

export const SearchItem = ({ avatarUrl, name, loginName }: SearchItemProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/${loginName}`);
	};

	return (
		<DropdownItem key={loginName} onClick={handleClick}>
			<ItemImageContainer>
				{avatarUrl && <ItemImage src={avatarUrl} alt={name} />}
			</ItemImageContainer>
			<ItemTextContainer>
				<ItemName>{name}</ItemName>
				<ItemLogin>{'@' + loginName}</ItemLogin>
			</ItemTextContainer>
		</DropdownItem>
	);
};
