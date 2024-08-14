import SearchIcon from '@assets/icons/SearchPanel/SearchIcon.svg';

import { SearchContainer, SearchImage, SearchInput } from './styled';

export const SearchBar = () => (
	<SearchContainer>
		<SearchImage src={SearchIcon} />
		<SearchInput type='text' placeholder='Поиск' />
	</SearchContainer>
);
