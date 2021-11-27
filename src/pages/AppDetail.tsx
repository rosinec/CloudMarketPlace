import { Box } from '@mui/material';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import InstallButton from '../components/InstallButton';
import { useAppByName } from '../hooks/useApps';
import { useLoggedInUser } from '../hooks/useLoggedInUser';

const AppDetail: FC = () => {
	const user = useLoggedInUser();

	const { name } = useParams<{ name: string }>();
	const { description } = useAppByName(name);
	const installedApp = useMemo(() => {
		if (user?.installedApps === undefined) return null;
		return user?.installedApps.find(app => app.name === name) ?? null;
	}, [user]);

	return (
		<Box>
			<h1>{name}</h1>
			<InstallButton name={name} installed={installedApp !== null} />
			<p>{description}</p>
			{installedApp !== null && (
				<p>
					Installed at{' '}
					{new Date(installedApp.installedAt.toMillis())
						.toISOString()
						.substring(0, 10)}
				</p>
			)}
		</Box>
	);
};

export default AppDetail;
