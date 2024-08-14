import { MainLayout } from '@components/MainLayout';
import { NavBar } from '@components/NavBar';

import { HomeContainer } from './styled';

export const Home = () => (
	<HomeContainer>
		<NavBar />
		<MainLayout />
	</HomeContainer>
);
