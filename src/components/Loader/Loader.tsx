import LoaderAnimation from '@assets/animations/LoaderAnimation.svg';

import { LoaderIcon, LoaderWrapper } from './styled';

export const Loader = () => (
	<LoaderWrapper>
		<LoaderIcon src={LoaderAnimation} />
	</LoaderWrapper>
);
