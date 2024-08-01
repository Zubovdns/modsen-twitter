import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@assets/icons/GoogleIcon.svg';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { auth, googleProvider } from '@src/firebase';
import { LOGIN_ROUTE, REGISTER_ROUTE, SIGN_UP_ROUTE } from '@src/routes';
import { signInWithPopup } from 'firebase/auth';

import {
	ALREADY_HAVE_AN_ACCOUNT,
	COOKIE_USE,
	DISCLAIMER_TEXT,
	HAPPENING_NOW,
	JOIN_TWITTER_TODAY,
	LOG_IN,
	PRIVACY_POLICY,
	SIGN_UP_WITH_EMAIL,
	SIGN_UP_WITH_GOOGLE,
	TERMS_OF_SERVICE,
} from './constants';
import {
	ContentContainer,
	Disclaimer,
	DisclaimerLink,
	Icon,
	Logo,
	SignUpButton,
	Subtitle,
	Title,
} from './styled';

const SignUpOptions = () => {
	const navigate = useNavigate();

	const handleGoogleSignUpClick = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error(error);
		}
	};
	const handleEmailSignUpClick = () => {
		navigate(REGISTER_ROUTE);
	};

	return (
		<ContentContainer>
			<Logo src={TwitterLogo} />
			<Title>{HAPPENING_NOW}</Title>
			<Subtitle>{JOIN_TWITTER_TODAY}</Subtitle>

			<SignUpButton onClick={handleGoogleSignUpClick}>
				<Icon src={GoogleIcon} alt='Google Icon' />
				{SIGN_UP_WITH_GOOGLE}
			</SignUpButton>
			<SignUpButton onClick={handleEmailSignUpClick}>
				{SIGN_UP_WITH_EMAIL}
			</SignUpButton>

			<Disclaimer>
				{DISCLAIMER_TEXT}
				<DisclaimerLink to={SIGN_UP_ROUTE}>
					{TERMS_OF_SERVICE}
				</DisclaimerLink>{' '}
				and <DisclaimerLink to={SIGN_UP_ROUTE}>{PRIVACY_POLICY}</DisclaimerLink>
				, including{' '}
				<DisclaimerLink to={SIGN_UP_ROUTE}>{COOKIE_USE}</DisclaimerLink>.
			</Disclaimer>
			<Disclaimer>
				{ALREADY_HAVE_AN_ACCOUNT}{' '}
				<DisclaimerLink to={LOGIN_ROUTE}>{LOG_IN}</DisclaimerLink>
			</Disclaimer>
		</ContentContainer>
	);
};

export default SignUpOptions;
