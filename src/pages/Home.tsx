import { CircularProgress, Grid, Box } from '@mui/material';
import { useState } from 'react';

import { useTranslation } from '../hooks/useTranslation';
import AppDrawer from '../components/AppDrawer';
import usePageTitle from '../hooks/usePageTitle';
import { useAppsLoading } from '../hooks/useApps';
import AppCard from '../components/AppCard';
import { App } from '../utils/firebase';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));

	const [apps, setApps] = useState<App[]>([]);

	const loading = useAppsLoading();

	return (
		<Box display="flex" flexDirection="row" justify-content="flex-start">
			<AppDrawer setApps={setApps} />
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
		</Box>
	);
};

export default Home;
