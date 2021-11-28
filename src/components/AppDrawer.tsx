import { Box, Button, Toolbar, Drawer, TextField } from '@mui/material';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useApp } from '../hooks/useApps';
import { useTranslation } from '../hooks/useTranslation';
import { App } from '../utils/firebase';
import useField from '../hooks/useField';

import TagFilter from './TagFilter';

const drawerWidth = 200;

type Props = {
	setApps: Dispatch<SetStateAction<App[]>>;
};

const AppDrawer = ({ setApps }: Props) => {
	const t = useTranslation();
	const [allApps] = useApp();

	const [tags, setTags] = useState<string[]>([]);
	const [search, searchProps] = useField('search', false);

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

	return (
		<Box flexGrow={0} width="200px">
			<Drawer
				sx={{
					'width': drawerWidth,
					'flexShrink': 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Button style={{ justifyContent: 'flex-start' }}>
					{t('drawer.all')}
				</Button>
				<Divider />
				<Button style={{ justifyContent: 'flex-start' }}>
					{t('drawer.trending')}
				</Button>
				<Divider />
				<Button style={{ justifyContent: 'flex-start' }}>
					{t('drawer.new')}
				</Button>
				<Divider />

				<TextField
					label={t('drawer.search')}
					{...searchProps}
					type="search"
					variant="standard"
					sx={{
						m: '15px'
					}}
				/>

				<Divider />
				<TagFilter tags={tags} setTags={setTags} />
			</Drawer>
		</Box>
	);
};

export default AppDrawer;
