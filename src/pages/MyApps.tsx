import { Grid, Box, Typography, Card, CardContent, Link } from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import AppCard from '../components/AppCard';
import { useFilterDrawer } from '../hooks/useFilterDrawer';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const MyApps = () => {
	const t = useTranslation();
	const user = useLoggedInUser();
	usePageTitle(t('drawer.my-apps'));

	const isUserInstalledApp = (name: string) => {
		if (user?.installedApps === undefined) return false;
		return user?.installedApps.find(app => app.name === name);
	};

	const [, , apps] = useFilterDrawer();

	const userInstalled = apps.filter(app => isUserInstalledApp(app.name));

	return (
		<Box>
			<Grid container spacing={2}>
				{userInstalled.length !== 0 ? (
					userInstalled.map((app, index) => (
						<Grid key={index} item xs={12} sm={6} md={4}>
							<AppCard {...app} />
						</Grid>
					))
				) : (
					<Card
						sx={{
							width: '100%',
							height: '300px',
							padding: 5,
							mb: 3,
							display: 'flex',
							flexDirection: 'row',
							alignContent: 'center',
							justifyContent: 'space-evenly',
							alignItems: 'center',
							backgroundImage:
								'linear-gradient(90deg, rgb(242 212 92) 13%, rgba(255,255,255,0.10407913165266103) 100%)'
						}}
					>
						<CardContent>
							<Typography variant="h4">
								{t('layout.my-apps.no-instaled')}
							</Typography>
							<Typography variant="h5">
								{t('layout.my-apps.start')}{' '}
								<Link variant="h5" href="/">
									{t('layout.my-apps.marketplace')}
								</Link>
								.
							</Typography>
						</CardContent>
					</Card>
				)}
			</Grid>
		</Box>
	);
};

export default MyApps;
