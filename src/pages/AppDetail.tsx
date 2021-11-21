import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useAppByName } from '../hooks/useApps';

const AppDetail: FC = () => {
	const { name } = useParams<{ name: string }>();
	const { description } = useAppByName(name);

	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
		</div>
	);
};

export default AppDetail;
