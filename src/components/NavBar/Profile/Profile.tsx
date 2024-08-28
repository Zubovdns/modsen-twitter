import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitIcon from '@assets/icons/NavBar/ExitIcon.svg';
import { useNotification } from '@hooks/useNotification';
import { auth, db } from '@src/firebase';
import { SIGN_UP_ROUTE } from '@src/routes';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { Avatar } from './Avatar';
import { LOG_OUT_ERROR_MESSAGE } from './constants';
import {
	ExitImage,
	ProfileWrapper,
	TextContainer,
	UserLoginName,
	UserName,
} from './styled';

export const Profile = () => {
	const [showNotification, NotificationComponent] = useNotification();
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [isAuth, setIsAuth] = useState(false);
	const [name, setName] = useState<string | null>(null);
	const [loginName, setLoginName] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const user = auth.currentUser;
				if (user) {
					const userDocRef = doc(db, 'users', user.uid);
					const userDoc = await getDoc(userDocRef);

					if (userDoc.exists()) {
						const userData = userDoc.data();
						setAvatarUrl(userData.profile_image);
						setName(userData.name);
						setLoginName(userData.login_name);
						setIsAuth(true);
					}
				}
			} catch (error) {
				showNotification('Failed to load user data.');
				setIsAuth(false);
			}
		};

		fetchUserProfile();
	});

	const handleLogOut = async () => {
		try {
			await signOut(auth).then(() => navigate(SIGN_UP_ROUTE));
		} catch (error) {
			showNotification(LOG_OUT_ERROR_MESSAGE);
		}
	};

	if (!isAuth) return null;
	return (
		<>
			<ProfileWrapper onClick={handleLogOut}>
				<Avatar src={avatarUrl} alt='Avatar image' />
				<TextContainer>
					<UserName>{name}</UserName>
					<UserLoginName>{'@' + loginName}</UserLoginName>
				</TextContainer>
				<ExitImage src={ExitIcon} alt='Exit icon' />
			</ProfileWrapper>
			<NotificationComponent />
		</>
	);
};
