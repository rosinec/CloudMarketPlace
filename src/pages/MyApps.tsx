import { Grid, Box } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const MyApps = () => {
	const t = useTranslation();
	const user = useLoggedInUser();
	usePageTitle(t('layout.all'));

	const isUserInstalledApp = (name: string) => {
		if (user?.installedApps === undefined) return false;
		return user?.installedApps.find(app => app.name === name);
	};

	const [, , apps] = useFilterDrawer();

	return (
		<Box>
			<Grid container spacing={2}>
				{apps
					.filter(app => isUserInstalledApp(app.name))
					.map((app, index) => (
						<Grid key={index} item xs={12} sm={6} md={4}>
							<AppCard {...app} />
						</Grid>
					))}
			</Grid>
		</Box>
	);
};

export default MyApps;
