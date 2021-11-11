import { Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const NotFound = () => {
	const t = useTranslation();
	usePageTitle(t('layout.notFound'));
	return (
		<>
			<WarningIcon sx={{ typography: 'h1' }} />
			<Typography variant="h2">Not Found</Typography>
			<Typography>Oops, looks like this page does not exist</Typography>
		</>
	);
};

export default NotFound;
