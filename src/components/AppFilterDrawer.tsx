import { Box, Chip, Button, Toolbar, Drawer, TextField } from '@mui/material';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useApp, useTags } from '../hooks/useApps';
import { useTranslation } from '../hooks/useTranslation';
import { App } from '../utils/firebase';
import useField from '../hooks/useField';

const drawerWidth = 200;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 200
		}
	}
};

type Props = {
	setApps: Dispatch<SetStateAction<App[]>>;
};

const AppFilterDrawer = ({ setApps }: Props) => {
	const t = useTranslation();
	const [allApps] = useApp();
	const allTags = useTags();

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

	const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value }
		} = event;
		setTags(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleFilterClear = () => {
		setTags([]);
	};

	const handleDelete = () => {
		setTags([]);
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
				<FormControl sx={{ mt: '30px', width: 180 }}>
					<Button
						sx={{
							width: '20px',
							position: 'absolute',
							pr: '0px',
							right: '0',
							mt: '-15px',
							fontSize: '10px'
						}}
						onClick={handleFilterClear}
					>
						{t('drawer.tags.clear')}
					</Button>
					<InputLabel id="tags-checkbox-label">{t('drawer.tags')}</InputLabel>

					<Select
						labelId="tags-checkbox-label"
						id="tags-checkbox"
						multiple
						disableUnderline
						value={tags}
						onChange={handleFilterChange}
						input={<Input sx={{ p: '10px' }} />}
						renderValue={selected => (
							<Box
								sx={{
									paddingRight: '10px',
									paddingBottom: '0px',
									display: 'flex',
									flexWrap: 'wrap',
									gap: 0.5
								}}
							>
								{selected.map(value => (
									<Chip key={value} label={value} onDelete={handleDelete} />
								))}
							</Box>
						)}
						MenuProps={MenuProps}
					>
						{Array.from(allTags.values()).map(name => (
							<MenuItem key={name} value={name}>
								<Checkbox checked={tags.indexOf(name) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Drawer>
		</Box>
	);
};

export default AppFilterDrawer;
