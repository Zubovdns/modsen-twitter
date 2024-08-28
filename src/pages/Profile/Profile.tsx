import { SearchPanel } from '@src/components/SearchPanel';
import { ThemeSwitcher } from '@src/components/ThemeSwitcher';

import {
	HeaderContainer,
	ProfileContainer,
	ProfileWrapper,
	Title,
} from './styled';

export const Profile = () => (
	<>
		<ProfileWrapper>
			<ProfileContainer>
				<HeaderContainer>
					<Title>Profile</Title>
					<ThemeSwitcher />
				</HeaderContainer>
			</ProfileContainer>
		</ProfileWrapper>
		<SearchPanel />
	</>
);
