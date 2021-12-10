import {
	IconButton,
	List,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	ListSubheader
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import {
	AppRegistration,
	Apps,
	ChevronRight,
	Home,
	Whatshot,
	Computer
} from '@mui/icons-material';

import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { useTranslation } from '../hooks/useTranslation';
import { DrawerHeader, Drawer } from '../utils/drawerUtils';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const AppDrawer = () => {
	const t = useTranslation();
	const location = useLocation();
	const user = useLoggedInUser();
	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();

	const mainItems = [
		{ to: '/', icon: <Home />, text: t('layout.all') },
		{
			to: '/category/trending',
			icon: <Whatshot />,
			text: t('drawer.trending')
		},
		{ to: '/category/desktop', icon: <Computer />, text: t('drawer.desktops') }
	];
	const userItems = [
		{ to: '/myapps', icon: <Apps />, text: t('drawer.my-apps') }
	];
	const adminItems = [
		{ to: '/apps/add', icon: <AppRegistration />, text: t('layout.all') }
	];

	return (
		<Drawer variant="permanent" open={mobileOpen}>
			<DrawerHeader>
				<IconButton onClick={handleDrawerToggle}>
					<ChevronRight />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{mainItems.map((item, index) => (
					<ListItemButton
						key={index}
						to={item.to}
						component={Link}
						selected={item.to === location.pathname}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItemButton>
				))}
			</List>
			{user ? (
				<List
					sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							{t('drawer.profile')}
						</ListSubheader>
					}
				>
					{userItems.map((item, index) => (
						<ListItemButton
							key={index}
							to={item.to}
							component={Link}
							selected={item.to === location.pathname}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					))}
				</List>
			) : (
				''
			)}
			{user?.isAdmin ? (
				<List
					sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							{t('drawer.admin')}
						</ListSubheader>
					}
				>
					{adminItems.map((item, index) => (
						<ListItemButton
							key={index}
							to={item.to}
							component={Link}
							selected={item.to === location.pathname}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					))}
				</List>
			) : (
				''
			)}
		</Drawer>
	);
};

export default AppDrawer;
