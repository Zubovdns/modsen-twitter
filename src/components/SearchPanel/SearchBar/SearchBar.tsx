import { useEffect, useRef, useState } from 'react';
import SearchIcon from '@assets/icons/SearchPanel/SearchIcon.svg';

import { mockResults, NO_RESULT } from './constants';
import { SearchItem } from './SearchItem';
import {
	DropdownList,
	EmptyMessage,
	SearchContainer,
	SearchImage,
	SearchInput,
} from './styled';
import { SearchItemType } from './types';

export const SearchBar = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [searchResults, setSearchResults] =
		useState<SearchItemType[]>(mockResults);

	const searchRef = useRef<HTMLDivElement>(null);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setTimeout(() => setIsFocused(false), 200);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			searchRef.current &&
			!searchRef.current.contains(event.target as Node)
		) {
			setIsFocused(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<SearchContainer ref={searchRef}>
			<SearchImage src={SearchIcon} alt='Search icon' />
			<SearchInput
				type='text'
				placeholder='Поиск'
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			{isFocused && (
				<DropdownList>
					{searchResults.length === 0 ? (
						<EmptyMessage>{NO_RESULT}</EmptyMessage>
					) : (
						searchResults
							.slice(0, 9)
							.map(({ avatarUrl, name, loginName }) => (
								<SearchItem
									key={loginName}
									avatarUrl={avatarUrl}
									name={name}
									loginName={loginName}
								/>
							))
					)}
				</DropdownList>
			)}
		</SearchContainer>
	);
};
