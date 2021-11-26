import { FC } from 'react';
import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	CircularProgress,
	IconButton
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import { useTranslation } from '../hooks/useTranslation';
import { useUsersLoading } from '../hooks/useLoggedInUser';
import { useFilterDrawer } from '../hooks/useFilterDrawer';

import LanguageSwitch from './switches/LanguageSwitch';
import ThemeSwitch from './switches/ThemeSwitch';
import LoginSwitch from './switches/LoginSwitch';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const userLoading = useUsersLoading();

	const [, handleDrawerToggle] = useFilterDrawer();
	const location = useLocation();
	const showDrawer = location.pathname === '/';

	return (
		<>
			<AppBar
				color="default"
				position="sticky"
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Container maxWidth={false}>
					<Toolbar disableGutters sx={{ gap: 2 }}>
						{showDrawer && (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: 'none' } }}
							>
								<MenuIcon />
							</IconButton>
						)}
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
