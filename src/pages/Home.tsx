import { CircularProgress, Grid, Box } from '@mui/material';
import { useState } from 'react';

import { useTranslation } from '../hooks/useTranslation';
import AppFilterDrawer from '../components/AppFilterDrawer';
import usePageTitle from '../hooks/usePageTitle';
import { useApp, useAppsLoading } from '../hooks/useApps';
import AppCard from '../components/AppCard';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));

	const [tags, setTags] = useState<string[]>([]);

	const [apps] = useApp();
	const loading = useAppsLoading();

	const appApplyToFilter = (appTags: string[]) => {
		if (tags.length === 0) {
			return true;
		}
		return tags.some(tag => appTags.indexOf(tag) > -1);
	};

	return (
		<>
			<AppFilterDrawer tags={tags} setTags={setTags} />
			<Box
				maxWidth="lg"
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
								<Grid key={index} item xs={12} sm={6} md={4}>
									<AppCard {...app} />
								</Grid>
							))}
					</Grid>
				)}
			</Box>
		</>
	);
};

export default Home;
