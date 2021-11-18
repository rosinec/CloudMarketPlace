import { Typography } from '@mui/material';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));
	const user = useLoggedInUser();

	return (
		<>
			<p>Hello World</p>
			{user?.email && (
				<>
					<Typography variant="h4" textAlign="center">
						{`${t('home.welcome')} ${user?.email}`}!
					</Typography>
					<p>{user?.isAdmin && `You are an ADMIN`}</p>
				</>
			)}
		</>
	);
};

export default Home;
