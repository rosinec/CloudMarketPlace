import { FC } from 'react';
import {
	Container,
	Toolbar,
	Box,
	CircularProgress,
	IconButton,
	Typography,
	TextField
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useUsersLoading } from '../hooks/useLoggedInUser';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { useAppsLoading } from '../hooks/useApps';
import { DRAWER_WIDTH } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import useFilter from '../hooks/useFilter';
import { AppBar } from '../utils/drawerUtils';
import logo from '../utils/logo.png';

import LanguageSwitch from './switches/LanguageSwitch';
import ThemeSwitch from './switches/ThemeSwitch';
import LoginSwitch from './switches/LoginSwitch';
import AppDrawer from './AppDrawer';

const Layout: FC = ({ children }) => {
	const t = useTranslation();
	const userLoading = useUsersLoading();
	const appsLoading = useAppsLoading();

	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();

	const [, , searchProps, ,] = useFilter();

	return (
		<>
			<AppBar color="default" position="sticky" open={mobileOpen}>
				<Container maxWidth={false}>
					<Toolbar disableGutters sx={{ gap: 2 }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerToggle}
							edge="start"
							sx={{
								marginRight: '36px',
								...(mobileOpen && { display: 'none' })
							}}
						>
							<MenuIcon />
						</IconButton>
						<img
							src={logo}
							alt="Cloud marketplace!"
							className="logo"
							style={{ width: '100px' }}
						/>
						<Typography variant="h5" sx={{ width: '25%' }}>
							{t('app.title')}
						</Typography>
						<TextField
							label={t('drawer.search').toUpperCase()}
							{...searchProps}
							type="search"
							variant="standard"
							sx={{
								width: ['100%', '50%', '50%'],
								mb: 1
							}}
						/>
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
