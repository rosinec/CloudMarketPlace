import {
	CircularProgress,
	Grid,
	Box,
	Chip,
	Button,
	AppBar,
	Toolbar,
	Drawer
} from '@mui/material';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import { useApp, useAppsLoading } from '../hooks/useApps';
import AppCard from '../components/AppCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const tags = [
	'statistics',
	'bioinformatics',
	'molecural modeling',
	'informatics'
];

const drawerWidth = 240;

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));

	const [apps] = useApp();
	const loading = useAppsLoading();

	const [categories, setCategories] = React.useState<string[]>([]);

	const handleChange = (event: { target: { value: any } }) => {
		const {
			target: { value }
		} = event;
		setCategories(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleClear = () => {
		setCategories([]);
	};

	const appApplyToFilter = (appTags: string[]) => {
		if (categories.length === 0) {
			return true;
		}
		return categories.some(category => appTags.indexOf(category) > -1);
	};

	return (
		<Box display="flex" flexDirection="row" justify-content="flex-start">
			<Box flexGrow={0} width="200px">
				{/* <AppBar color="default" sx={{ p: '10px' }} position="sticky"> */}
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
					{/* <Toolbar disableGutters sx={{ gap: 2 }}> */}
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
								right: '0',
								mt: '-10px',
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
							value={categories}
							onChange={handleChange}
							input={<Input />}
							renderValue={selected => (
								<Box
									sx={{
										paddingRight: '10px',
										paddingBottom: '0px',
										display: 'flex',
										flexWrap: 'wrap',
										// overflow: 'hidden',
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
							{tags.map(name => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={categories.indexOf(name) > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{/* </Toolbar> */}
				</Drawer>
				{/* </AppBar> */}
			</Box>
			<Box
				flexGrow={1}
				sx={{
					padding: '30px'
				}}
			>
				{loading ? (
					<CircularProgress />
				) : (
					<Grid container spacing={2}>
						{apps
							.filter(app => appApplyToFilter(app.tags))
							.map((app, index) => (
								<Grid
									key={index}
									item
									xs={12}
									sm={6}
									md={apps.length % 3 === 2 ? 6 : 4}
								>
									<AppCard {...app} />
								</Grid>
							))}
					</Grid>
				)}
			</Box>
		</Box>
	);
};

export default Home;
