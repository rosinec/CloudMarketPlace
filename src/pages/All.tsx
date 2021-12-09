import { Grid, Box, Typography, Toolbar, Divider } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import AppFeatured from '../components/AppFeatured';
import useFilter from '../hooks/useFilter';
import TagFilter from '../components/TagFilter';

const All = () => {
	const t = useTranslation();
	usePageTitle(t('layout.all'));

	const [, , apps] = useFilterDrawer();
	const [tags, setTags, , ,] = useFilter();

	const featured = apps.filter(app => app.featured === true)[0];
	return (
		<>
			<Toolbar sx={{ backgroundColor: 'background.paper' }}>
				<Typography variant="h5">Filter</Typography>
				<TagFilter tags={tags} setTags={setTags} />
				<Divider
					orientation="vertical"
					component="span"
					sx={{ ml: 1, mr: 1, backgroundColor: 'white' }}
				/>
			</Toolbar>
			{featured ? <AppFeatured {...featured} /> : ''}
			<Box sx={{ mt: 3 }}>
				<Typography variant="h4" sx={{ mb: 2 }}>
					Available for you
				</Typography>
				<Grid container spacing={2}>
					{apps.map((app, index) => (
						<Grid key={index} item xs={12} sm={6} md={4}>
							<AppCard {...app} />
						</Grid>
					))}
				</Grid>
			</Box>
			<Box sx={{ mt: 3 }}>
				<Typography variant="h4" sx={{ mb: 2 }}>
					Do <b>GREAT</b> things with your <b>Cloud PC!</b>
				</Typography>
				<Grid container spacing={2}>
					{apps
						.filter(app => app.tags.some(tag => tag === 'desktop'))
						.map((app, index) => (
							<Grid key={index} item xs={12} sm={6} md={4}>
								<AppCard {...app} />
							</Grid>
						))}
				</Grid>
			</Box>
		</>
	);
};

export default All;
