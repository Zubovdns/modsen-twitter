import SignUpImage from '@assets/images/SignUpImage.svg';
import Footer from '@src/components/Footer';
import SignUpOptions from '@src/components/SignUpOptions';

import { ContentContainer, Image, SignUpContainer } from './styled';

const SignUp = () => (
	<SignUpContainer>
		<ContentContainer>
			<Image src={SignUpImage} alt='SignUp Image' />
			<SignUpOptions />
		</ContentContainer>
		<Footer />
	</SignUpContainer>
);

export default SignUp;
