import { Box, Chip, Button, Toolbar, Drawer } from '@mui/material';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { Dispatch, SetStateAction } from 'react';

import { useTags } from '../hooks/useApps';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import {
	DRAWER_WIDTH,
	ITEM_HEIGHT,
	ITEM_PADDING_TOP
} from '../utils/constants';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 200
		}
	}
};

type Props = {
	tags: string[];
	setTags: Dispatch<SetStateAction<string[]>>;
};

const AppFilterDrawer = ({ tags, setTags }: Props) => {
	const allTags = useTags();
	const [mobileOpen, handleDrawerToggle] = useFilterDrawer();

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value }
		} = event;
		setTags(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleClear = () => {
		setTags([]);
	};

	const drawer = (
		<>
			<Toolbar />
			<Button style={{ justifyContent: 'flex-start' }}>All</Button>
			<Divider />
			<Button style={{ justifyContent: 'flex-start' }}>Trending</Button>
			<Divider />
			<Button style={{ justifyContent: 'flex-start' }}>New</Button>
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
					onClick={handleClear}
				>
					Clear
				</Button>
				<InputLabel id="category-checkbox-label">CATEGORY</InputLabel>

				<Select
					labelId="category-checkbox-label"
					id="category-checkbox"
					multiple
					disableUnderline
					value={tags}
					onChange={handleChange}
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
								<Chip key={value} label={value} />
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
