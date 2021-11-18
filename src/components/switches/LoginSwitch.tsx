import { FC } from 'react';
import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

import { useLoggedInUser } from '../../hooks/useLoggedInUser';
import { signOut } from '../../utils/firebase';

const LoginSwitch: FC = () => {
	const user = useLoggedInUser();
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{!user ? (
				<IconButton component={Link} to="/login">
					<LoginIcon fontSize="inherit" />
				</IconButton>
			) : (
				<IconButton onClick={signOut}>
					<LogoutIcon fontSize="inherit" />
				</IconButton>
			)}
		</>
	);
};

export default LoginSwitch;
