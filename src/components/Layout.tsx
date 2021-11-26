import { FC } from 'react';
import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';
import { useUsersLoading } from '../hooks/useLoggedInUser';

import LanguageSwitch from './switches/LanguageSwitch';
import ThemeSwitch from './switches/ThemeSwitch';
import LoginSwitch from './switches/LoginSwitch';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const userLoading = useUsersLoading();
	return (
		<>
			<AppBar
				color="default"
				position="sticky"
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
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

			<Box
				maxWidth="lg"
				component="main"
				sx={{
					px: '0',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{userLoading ? <CircularProgress /> : children}
			</Box>
		</>
	);
};
export default Layout;
