import { Grid, Box } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';

const All = () => {
	const t = useTranslation();
	usePageTitle(t('layout.all'));

	const [, , apps] = useFilterDrawer();

	return (
		<Box>
			<Grid container spacing={2}>
				{apps.map((app, index) => (
					<Grid key={index} item xs={12} sm={6} md={4}>
						<AppCard {...app} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default All;
