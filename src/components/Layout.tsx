import { FC } from 'react';
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';

import LanguageSwitch from './switches/LanguageSwitch';
import ThemeSwitch from './switches/ThemeSwitch';
import LoginSwitch from './switches/LoginSwitch';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	return (
		<>
			<AppBar color="default" position="fixed">
				<Container maxWidth="lg">
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<Button component={Link} to="/">
							{t('layout.home')}
						</Button>
						<Box sx={{ flexGrow: 1 }} />
						<LanguageSwitch />
						<ThemeSwitch />
						<LoginSwitch />
					</Toolbar>
				</Container>
			</AppBar>

			<Container
				maxWidth="lg"
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
