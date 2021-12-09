import {
	IconButton,
	List,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	ListSubheader
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
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
// import useFilter from '../hooks/useFilter';
import { DrawerHeader, Drawer } from '../utils/drawerUtils';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const AppDrawer = () => {
	const t = useTranslation();
	const user = useLoggedInUser();
	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();

	const items = [
		{ to: '/', icon: <Home />, text: t('layout.all') },
		{
			to: '/category/trending',
			icon: <Whatshot />,
			text: t('drawer.trending')
		},
		{ to: '/category/desktop', icon: <Computer />, text: t('drawer.desktops') }
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
				{items.map((item, index) => (
					<ListItemButton key={index} to={item.to} component={Link}>
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
							My profile
						</ListSubheader>
					}
				>
					<ListItemButton to="/myapps" component={Link}>
						<ListItemIcon>
							<Apps />
						</ListItemIcon>
						<ListItemText primary={t('drawer.my-apps')} />
					</ListItemButton>
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
							Admin
						</ListSubheader>
					}
				>
					<ListItemButton to="/apps/add" component={Link}>
						<ListItemIcon>
							<AppRegistration />
						</ListItemIcon>
						<ListItemText primary="Add new app" />
					</ListItemButton>
				</List>
			) : (
				''
			)}
		</Drawer>
	);
};

export default AppDrawer;
