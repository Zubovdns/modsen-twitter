import { Suspense } from 'react';

import { Loader } from '../Loader';
import { NavBar } from '../NavBar';

import { MainLayoutContainer, MainLayoutWrapper } from './styled';
import { MainLayoutProps } from './types';

export const MainLayout = ({ Page }: MainLayoutProps) => (
	<MainLayoutWrapper>
		<NavBar />
		<MainLayoutContainer>
			<Suspense fallback={<Loader />}>
				<Page />
			</Suspense>
		</MainLayoutContainer>
	</MainLayoutWrapper>
);
