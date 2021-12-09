import { Grid, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import { useCategoryByName } from '../hooks/useCategory';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';

const Trending = () => {
	const t = useTranslation();
	usePageTitle(t('drawer.trending'));

	const [, , apps] = useFilterDrawer();

	const { name } = useParams<{ name: string }>();

	const currentCategory = useCategoryByName(name);

	return (
		<Box sx={{ mt: 3 }}>
			<Typography variant="h4" sx={{ mb: 2 }}>
				{currentCategory?.title ?? name}
			</Typography>
			<Grid container spacing={2}>
				{apps
					.filter(app => app.tags.some(tag => tag === name))
					.map((app, index) => (
						<Grid key={index} item xs={12} sm={6} md={4}>
							<AppCard {...app} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default Trending;
