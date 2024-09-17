import SignUpImage from '@assets/images/SignUpImage.jpg';
import { Footer } from '@components/Footer';
import SignUpOptions from '@components/SignUpOptions';

import { ContentContainer, Image, SignUpContainer } from './styled';

export const SignUp = () => (
	<SignUpContainer>
		<ContentContainer>
			<Image src={SignUpImage} alt='SignUp Image' />
			<SignUpOptions />
		</ContentContainer>
		<Footer />
	</SignUpContainer>
);
