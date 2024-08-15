import { NavBar } from '../NavBar';
import { SearchPanel } from '../SearchPanel';

import { MainLayoutContainer, MainLayoutWrapper, PageWrapper } from './styled';
import { MainLayoutProps } from './types';

export const MainLayout = ({ Page }: MainLayoutProps) => (
	<MainLayoutWrapper>
		<NavBar />
		<MainLayoutContainer>
			<PageWrapper>
				<Page />
			</PageWrapper>
			<SearchPanel />
		</MainLayoutContainer>
	</MainLayoutWrapper>
);
