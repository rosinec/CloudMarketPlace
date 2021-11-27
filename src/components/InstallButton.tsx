import { FC } from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslation } from '../hooks/useTranslation';
import useInstall from '../hooks/useInstall';

type Props = {
	name: string;
	installed: boolean;
};

const InstallButton: FC<Props> = ({ name, installed }) => {
	const t = useTranslation();
	const [handleInstall, handleUninstall, loading] = useInstall(name);

	return (
		<LoadingButton
			onClick={installed ? handleUninstall : handleInstall}
			endIcon={installed ? <DeleteOutlineIcon /> : <GetAppIcon />}
			loading={loading}
			loadingPosition="end"
			variant="contained"
		>
			{installed ? t('app.uninstall') : t('app.install')}
		</LoadingButton>
	);
};

export default InstallButton;
