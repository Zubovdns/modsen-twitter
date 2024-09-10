import { useNavigate } from 'react-router-dom';
import ExitIcon from '@assets/icons/NavBar/ExitIcon.svg';
import { useNotification } from '@hooks/useNotification';
import { SIGN_UP_ROUTE } from '@src/routes';
import { selectUserError, selectUserStatus } from '@src/store/selectors/user';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logOut } from '@store/thunks/userThunk';

import { Avatar } from './Avatar';
import {
	ExitImage,
	ProfileWrapper,
	TextContainer,
	UserLoginName,
	UserName,
} from './styled';
import { MiniProfileProps } from './types';

export const MiniProfile = ({ userData }: MiniProfileProps) => {
	const [showNotification, NotificationComponent] = useNotification();

	const dispatch = useAppDispatch();
	const userStatus = useAppSelector(selectUserStatus);
	const userError = useAppSelector(selectUserError);

	const navigate = useNavigate();

	const handleLogOut = async () => {
		dispatch(logOut()).then(() => {
			if (userStatus !== 'failed') {
				navigate(SIGN_UP_ROUTE);
			} else {
				showNotification(userError || '');
			}
		});
	};

	return (
		<>
			<ProfileWrapper onClick={handleLogOut}>
				<Avatar src={userData.profile_image} alt='Avatar image' />
				<TextContainer>
					<UserName>{userData.name}</UserName>
					<UserLoginName>{'@' + userData.login_name}</UserLoginName>
				</TextContainer>
				<ExitImage src={ExitIcon} alt='Exit icon' />
			</ProfileWrapper>
			<NotificationComponent />
		</>
	);
};
