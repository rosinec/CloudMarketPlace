import { FC } from 'react';
import {
	AppBar,
	Container,
	Toolbar,
	Box,
	CircularProgress,
	IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useUsersLoading } from '../hooks/useLoggedInUser';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { useAppsLoading } from '../hooks/useApps';
import { DRAWER_WIDTH } from '../utils/constants';

import LanguageSwitch from './switches/LanguageSwitch';
import ThemeSwitch from './switches/ThemeSwitch';
import LoginSwitch from './switches/LoginSwitch';
import AppDrawer from './AppDrawer';

const Layout: FC = ({ children }) => {
	const userLoading = useUsersLoading();
	const appsLoading = useAppsLoading();

	const [, handleDrawerToggle] = useFilterDrawer();

	return (
		<>
			<AppBar
				color="default"
				position="sticky"
				sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
			>
				<Container maxWidth={false}>
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Box sx={{ flexGrow: 1 }} />
						<LanguageSwitch />
						<ThemeSwitch />
						<LoginSwitch />
					</Toolbar>
				</Container>
			</AppBar>

			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<AppDrawer />
				{userLoading || appsLoading ? (
					<CircularProgress
						style={{
							margin: '20px'
						}}
					/>
				) : (
					<Box
						component="main"
						maxWidth="lg"
						sx={{
							flexGrow: 1,
							p: 3,
							width: {
								sm: `calc(100% - ${DRAWER_WIDTH}px)`
							}
						}}
					>
						{children}
					</Box>
				)}
			</Box>
		</>
	);
};
export default Layout;
