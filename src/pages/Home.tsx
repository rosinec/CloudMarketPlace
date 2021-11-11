import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

type Props = {
	username?: string;
};

const Home = ({ username }: Props) => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));

	return (
		<>
			<p>Hello World</p>
			{username && (
				<Typography variant="h4" textAlign="center">
					{`${t('home.welcome')} ${username}`}!
				</Typography>
			)}
		</>
	);
};

export default Home;
