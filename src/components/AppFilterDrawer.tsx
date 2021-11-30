import { Box, Button, Toolbar, Drawer, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { DRAWER_WIDTH } from '../utils/constants';
import { useTranslation } from '../hooks/useTranslation';
import useField from '../hooks/useField';
import { useApp } from '../hooks/useApps';

import TagFilter from './TagFilter';

const AppFilterDrawer = () => {
	const t = useTranslation();
	const [allApps] = useApp();
	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();
	const [, , apps, setApps] = useFilterDrawer();

	const [tags, setTags] = useState<string[]>([]);
	const [search, setSearch, searchProps] = useField('search', false);

	useEffect(() => {
		const filteredAppsByTags = allApps.filter(app =>
			appApplyToFilter(app.tags)
		);
		const filteredApps = filteredAppsByTags.filter(app =>
			app.name.toLowerCase().includes(search.toLowerCase())
		);
		setApps(filteredApps);
	}, [search, tags, allApps]);

	const appApplyToFilter = (appTags: string[]) => {
		if (tags.length === 0) {
			return true;
		}
		return tags.some(tag => appTags.indexOf(tag) > -1);
	};

	const resetFilters = () => {
		setTags([]);
		setSearch('');
	};

	const applyNew = () => {
		apps.sort((first, second) => second.added.seconds - first.added.seconds);
		// TODO: this slice is not neccesarry...
		// But it does not propagate apps without slicing (or other change).
		// Also dont know why, but by default, the apps are fetched from db already sorted
		setApps(apps.slice(0));
	};

	const drawer = (
		<>
			<Toolbar />
			<Button style={{ justifyContent: 'flex-start' }} component={Link} to="/">
				{t('layout.all')}
			</Button>
			<Divider />
			<Button
				style={{ justifyContent: 'flex-start' }}
				component={Link}
				to="/myapps"
			>
				{t('layout.my-apps')}
			</Button>
			<Divider />
			<Button onClick={resetFilters} style={{ justifyContent: 'flex-start' }}>
				{t('drawer.reset')}
			</Button>
			<Divider />
			<Button style={{ justifyContent: 'flex-start' }}>
				{t('drawer.trending')}
			</Button>
			<Divider />
			<Button onClick={applyNew} style={{ justifyContent: 'flex-start' }}>
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

export default AppFilterDrawer;
