import { CircularProgress, Typography } from '@mui/material';

import { useLoggedInUser } from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const Home = () => {
	const t = useTranslation();
	usePageTitle(t('layout.home'));
	const [user, isLoading] = useLoggedInUser();

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{!isLoading ? (
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
			) : (
				<CircularProgress />
			)}
		</>
	);
};

export default Home;
