import { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

import { useTranslation } from '../../hooks/useTranslation';
import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { signOut } from '../../utils/firebase';

const LoginSwitch: FC = () => {
	const user = useLoggedInUser();
	const t = useTranslation();
	return (
		<Tooltip title={!user ? t('layout.login') : t('layout.logout')}>
			{!user ? (
				<IconButton component={Link} to="/login">
					<LoginIcon fontSize="inherit" />
				</IconButton>
			) : (
				<IconButton onClick={signOut}>
					<LogoutIcon fontSize="inherit" />
				</IconButton>
			)}
		</Tooltip>
	);
};

export default LoginSwitch;
