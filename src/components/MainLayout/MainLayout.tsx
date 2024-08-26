import { Suspense } from 'react';

import { Loader } from '../Loader';
import { NavBar } from '../NavBar';
import { SearchPanel } from '../SearchPanel';

import { MainLayoutContainer, MainLayoutWrapper, PageWrapper } from './styled';
import { MainLayoutProps } from './types';

export const MainLayout = ({ Page }: MainLayoutProps) => (
	<MainLayoutWrapper>
		<NavBar />
		<MainLayoutContainer>
			<PageWrapper>
				<Suspense fallback={<Loader />}>
					<Page />
				</Suspense>
			</PageWrapper>
			<SearchPanel />
		</MainLayoutContainer>
	</MainLayoutWrapper>
);
