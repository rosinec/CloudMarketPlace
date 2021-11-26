import { Box } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useAppByName } from '../hooks/useApps';

const AppDetail: FC = () => {
	const { name } = useParams<{ name: string }>();
	const { description } = useAppByName(name);

	return (
		<Box maxWidth="lg">
			<h1>{name}</h1>
			<p>{description}</p>
		</Box>
	);
};

export default AppDetail;
