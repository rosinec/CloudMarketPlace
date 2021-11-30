import { Box, Button, Toolbar, Drawer, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { DRAWER_WIDTH } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import useFilter from '../hooks/useFilter';

import TagFilter from './TagFilter';

const AppDrawer = () => {
	const t = useTranslation();
	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();

	const [tags, setTags, searchProps, applyNew, resetFilters] = useFilter();

	const drawer = (
		<>
			<Toolbar />
			<Button
				sx={{ ml: '10px', justifyContent: 'flex-start' }}
				component={Link}
				to="/"
			>
				{t('layout.all')}
			</Button>
			<Divider />
			<Button
				sx={{ ml: '10px', justifyContent: 'flex-start' }}
				component={Link}
				to="/myapps"
			>
				{t('layout.my-apps')}
			</Button>
			<Divider />
			<Divider />
			<Button sx={{ ml: '10px', justifyContent: 'flex-start' }}>
				{t('drawer.trending')}
			</Button>
			<Divider />
			<Button
				onClick={applyNew}
				sx={{ ml: '10px', justifyContent: 'flex-start' }}
			>
				{t('drawer.new')}
			</Button>
			<Divider />
			<TextField
				label={t('drawer.search').toUpperCase()}
				{...searchProps}
				type="search"
				variant="standard"
				sx={{
					m: '15px'
				}}
			/>
			<Divider />
			<TagFilter tags={tags} setTags={setTags} />
			<Button
				onClick={resetFilters}
				sx={{ ml: '10px', justifyContent: 'flex-start' }}
			>
				{t('drawer.reset')}
			</Button>
		</>
	);

	const container = window !== undefined ? () => document.body : undefined;

	return (
		<Box
			component="nav"
			sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true // Better open performance on mobile.
				}}
				sx={{
					'display': { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					'display': { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default AppDrawer;
