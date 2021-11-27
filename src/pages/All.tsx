import { Grid, Box } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import { useApp } from '../hooks/useApps';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';

const All = () => {
	const t = useTranslation();
	usePageTitle(t('layout.all'));

	const [, , tags] = useFilterDrawer();

	const [apps] = useApp();

	const appApplyToFilter = (appTags: string[]) => {
		if (tags.length === 0) {
			return true;
		}
		return tags.some(tag => appTags.indexOf(tag) > -1);
	};

	return (
		<Box>
			<Grid container spacing={2}>
				{apps
					.filter(app => appApplyToFilter(app.tags))
					.map((app, index) => (
						<Grid key={index} item xs={12} sm={6} md={4}>
							<AppCard {...app} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default All;
