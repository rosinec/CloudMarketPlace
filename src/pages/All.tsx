import { Grid, Box, Typography } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import AppFeatured from '../components/AppFeatured';

const All = () => {
	const t = useTranslation();
	usePageTitle(t('layout.all'));

	const [, , apps] = useFilterDrawer();

	const featured = apps.filter(app => app.featured === true)[0];
	return (
		<>
			{featured ? <AppFeatured {...featured} /> : console.log(featured)}
			<Typography variant="h4">Available for you</Typography>
			<Box>
				<Grid container spacing={2}>
					{apps.map((app, index) => (
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
