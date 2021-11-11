import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';
import { useTranslation } from '../hooks/useTranslation';

import LanguageSwitch from './LanguageSwitch';
import ThemeSwitch from './ThemeSwitch';

const Layout: FC = ({ children }) => {
	const user = useLoggedInUser();
	const t = useTranslation();
	return (
		<>
			<AppBar color="default" position="fixed">
				<Container maxWidth="sm">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button component={Link} to="/">
							{t('layout.home')}
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						<LanguageSwitch />
						<ThemeSwitch />
						{!user ? (
							<Button component={Link} to="/login">
								{t('layout.login')}
							</Button>
						) : (
							<Button onClick={signOut}>{t('layout.logout')}</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>

			<Container
				maxWidth="sm"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					pt: 8,
					gap: 2
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;
