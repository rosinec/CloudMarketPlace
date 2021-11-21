import { CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';

import AppCard from '../components/AppCard';
import { useApp, useAppsLoading } from '../hooks/useApps';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));

	const [apps] = useApp();
	const loading = useAppsLoading();

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			{loading ? (
				<CircularProgress />
			) : (
				<Grid container spacing={2}>
					{apps.map((app, index) => (
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
	);
};

export default Home;
