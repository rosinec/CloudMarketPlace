import { FC } from 'react';
import { useParams } from 'react-router-dom';

const AppDetail: FC = () => {
	const { name } = useParams<{ name: string }>();

	return <h1>{name}</h1>;
};

export default AppDetail;
