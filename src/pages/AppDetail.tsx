import {
	Box,
	Button,
	Divider,
	Grid,
	ImageList,
	ImageListItem,
	Paper,
	Typography
} from '@mui/material';
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import InstallButton from '../components/InstallButton';
import { useAppByName } from '../hooks/useApps';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';

const AppDetail: FC = () => {
	const user = useLoggedInUser();
	const t = useTranslation();

	const { name } = useParams<{ name: string }>();
	const currentApp = useAppByName(name);

	usePageTitle(name);
	const installedApp = useMemo(() => {
		if (user?.installedApps === undefined) return null;
		return user?.installedApps.find(app => app.name === name) ?? null;
	}, [user]);

	return (
		<>
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4}>
						<Paper variant="elevation">
							<img
								src={currentApp.image}
								alt="app logo"
								style={{ width: '100%' }}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Typography variant="h2">{currentApp.name}</Typography>
						<Grid container>
							<Grid item md={10}>
								<Typography gutterBottom variant="body1" component="div">
									{currentApp.author}
									<Divider
										orientation="vertical"
										component="span"
										sx={{ ml: 1, mr: 1 }}
									/>
									{currentApp.tags.slice(0, 2).map((tag, index) => (
										<span key={index} style={{ marginRight: '0.5em' }}>
											{tag}
										</span>
									))}
									{currentApp.tags.length > 2 ? (
										<span>
											+{currentApp.tags.length - 2} {t('app.moreText')}
										</span>
									) : (
										''
									)}
								</Typography>
							</Grid>
							<Grid item md={2} alignContent="center">
								<InstallButton name={name} installed={installedApp !== null} />
							</Grid>
						</Grid>
						<Grid container sx={{ mt: 3 }}>
							<Typography variant="body2">{currentApp.description}</Typography>
							<Box component="div" sx={{ mt: 3 }}>
								<Button
									size="small"
									onClick={() => window.open(currentApp.website, '_blank')}
								>
									{t('app.web')}
								</Button>
								<Button
									size="small"
									onClick={() =>
										window.open(currentApp.documentation, '_blank')
									}
								>
									{t('app.docs')}
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Grid>
				{installedApp !== null && (
					<p>
						{t('app.installed')}{' '}
						{new Date(installedApp.installedAt.toMillis())
							.toISOString()
							.substring(0, 10)}
					</p>
				)}
			</Box>
			{currentApp.screenshots ? (
				<Box>
					<Typography variant="h4">{t('app.detail.screenshots')}</Typography>
					<ImageList
						sx={{ width: '100%', height: 450 }}
						cols={
							currentApp.screenshots.length < 3
								? currentApp.screenshots.length
								: 3
						}
					>
						{currentApp.screenshots?.map(item => (
							<ImageListItem key={item}>
								<img src={item} alt={item} loading="lazy" />
							</ImageListItem>
						))}
					</ImageList>
				</Box>
			) : (
				''
			)}
			<Box>
				<Typography variant="h4">{t('app.detail.additional_info')}</Typography>
				<Typography variant="body1">{currentApp.connection_info}</Typography>
			</Box>
		</>
	);
};

export default AppDetail;
