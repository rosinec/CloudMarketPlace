import { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import UserMenu from '../UserMenu';
import { useTranslation } from '../../hooks/useTranslation';

const LoginSwitch: FC = () => {
	const user = useLoggedInUser();
	const t = useTranslation();
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{!user ? (
				<Tooltip title={t('layout.login')}>
					<IconButton component={Link} to="/login">
						<LoginIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
			) : (
				<UserMenu />
			)}
		</>
	);
};

export default LoginSwitch;
