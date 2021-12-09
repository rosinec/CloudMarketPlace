import {
	IconButton,
	List,
	ListItemIcon,
	ListItemText,
	ListItemButton
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { Apps, ChevronRight, Home } from '@mui/icons-material';

import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { useTranslation } from '../hooks/useTranslation';
// import useFilter from '../hooks/useFilter';
import { DrawerHeader, Drawer } from '../utils/drawerUtils';

const AppDrawer = () => {
	const t = useTranslation();
	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();

	// const [tags, setTags, , applyNew, resetFilters] = useFilter();

	const items = [
		{ to: '/', icon: <Home />, text: t('layout.all') },
		{ to: '/myapps', icon: <Apps />, text: t('layout.my-apps') }
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
		</Drawer>
	);
};

export default AppDrawer;
