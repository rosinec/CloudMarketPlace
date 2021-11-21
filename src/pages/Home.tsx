import { onSnapshot } from '@firebase/firestore';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import AppCard from '../components/AppCard';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { App, appsCollection } from '../utils/firebase';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));

	const [apps, setApps] = useState<App[]>([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(appsCollection, snapshot => {
			setApps(snapshot.docs.map(doc => doc.data()));
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
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
	);
};

export default Home;
