import { useEffect, useRef, useState } from 'react';
import { fetchSearchUsers } from '@api/firebase/firestore';
import SearchIcon from '@assets/icons/SearchPanel/SearchIcon.svg';
import { UserData } from '@interfaces/user';

import { DEBOUNCE_DELAY, NO_RESULT, SEARCH_PLACEHOLDER } from './constants';
import { SearchItem } from './SearchItem';
import {
	DropdownList,
	EmptyMessage,
	SearchContainer,
	SearchImage,
	SearchInput,
} from './styled';

export const SearchBar = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [searchResults, setSearchResults] = useState<UserData[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const searchRef = useRef<HTMLDivElement>(null);
	const debounceTimeoutRef = useRef<number | null>(null);

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

	const fetchUsers = async (queryText: string) => {
		const users = await fetchSearchUsers(queryText);
		setSearchResults(users);
	};

	useEffect(() => {
		if (debounceTimeoutRef.current) {
			clearTimeout(debounceTimeoutRef.current);
		}

		debounceTimeoutRef.current = window.setTimeout(() => {
			fetchUsers(searchQuery);
		}, DEBOUNCE_DELAY);

		return () => {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, [searchQuery]);

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
				placeholder={SEARCH_PLACEHOLDER}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			{isFocused && (
				<DropdownList>
					{searchResults.length === 0 ? (
						<EmptyMessage>{NO_RESULT}</EmptyMessage>
					) : (
						searchResults.map(({ profile_image, name, login_name }) => (
							<SearchItem
								key={login_name}
								avatarUrl={profile_image}
								name={name}
								loginName={login_name}
							/>
						))
					)}
				</DropdownList>
			)}
		</SearchContainer>
	);
};
