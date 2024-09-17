import { useNavigate } from 'react-router-dom';

import { ExitIcon } from '@assets/icons/NavBar/Simple/ExitIcon';
import { useNotification } from '@hooks/useNotification';
import { SIGN_UP_ROUTE } from '@src/routes';
import { selectUserError, selectUserStatus } from '@src/store/selectors/user';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { status } from '@store/slices/types';
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
			if (userStatus !== status.FAILED) {
				navigate(SIGN_UP_ROUTE);
			} else {
				showNotification(userError || '');
			}
		});
	};

	return (
		<>
			<ProfileWrapper onClick={handleLogOut}>
				<Avatar src={userData.profile_image} alt='Mini profile image' />
				<TextContainer>
					<UserName>{userData.name}</UserName>
					<UserLoginName>{'@' + userData.login_name}</UserLoginName>
				</TextContainer>
				<ExitImage>
					<ExitIcon />
				</ExitImage>
			</ProfileWrapper>
			<NotificationComponent />
		</>
	);
};
