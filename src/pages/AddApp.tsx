import {
	Grid,
	Box,
	Typography,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Dialog,
	DialogContent,
	DialogActions,
	CircularProgress,
	DialogTitle
} from '@mui/material';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Timestamp } from '@firebase/firestore';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import upload from '../utils/upload_placeholder.png';
import useField from '../hooks/useField';
import { addApp, uploadImage } from '../utils/firebase';

const AddApp = () => {
	const t = useTranslation();
	usePageTitle(t('layout.add_app'));

	const [img, setImg] = useState<File>();
	const objectURL = useMemo(
		() => (img ? window.URL.createObjectURL(img) : upload),
		[img]
	);
	const [appName, , appNameProps] = useField('name', true);
	const [appAuthor, , appAuthorProps] = useField('author', true);
	const [appDocsUrl, , appDocsUrlProps] = useField('docsUrl', true);
	const [appWebUrl, , appWebUrlProps] = useField('webUrl', true);
	const [appCategories, , appCategoriesProps] = useField('categories', true);
	const tags = useMemo<string[]>(
		() => appCategories.split(';'),
		[appCategories]
	);
	const [featured, setFeatured] = useState(false);
	const [appFeaturedText, , appFeaturedTextProps] = useField(
		'featuredText',
		true
	);
	const [appDescription, , appDescriptonProps] = useField('description', true);
	const [appAdditionalInfo, , appAdditionalInfoProps] = useField(
		'additionalInfo',
		true
	);

	const [saveProgress, setSaveProgress] = useState(false);

	type SavingStatus = {
		status: 'none' | 'success' | 'error';
		message?: string;
	};
	const [saveStatus, setSaveStatus] = useState<SavingStatus>({
		status: 'none'
	});
	const handleSave = async () => {
		setSaveProgress(true);
		if (!img || !appName || !appDescription) {
			console.log('Error.');
			setSaveStatus({
				status: 'error',
				message: ``
			});
			return;
		}

		const imgId: string = await uploadImage(appName, img)
			.then(a => `${a.ref.fullPath}`)
			.catch(() => {
				setSaveStatus({
					status: 'error',
					message: t('error.saveCloud')
				});
				return '';
			});
		const _appId = await addApp({
			name: appName,
			author: appAuthor,
			documentation: appDocsUrl,
			website: appWebUrl,
			tags,
			featured,
			featured_desc: appFeaturedText,
			description: appDescription,
			connection_info: appAdditionalInfo,
			image: imgId,
			added: Timestamp.now()
		})
			.then(a => {
				setSaveProgress(false);
				setSaveStatus({
					status: 'success',
					message: `${t('success.saveDB')}${a}.`
				});
			})
			.catch(() => {
				setSaveStatus({
					status: 'error',
					message: t('error.saveDB')
				});
			})
			.finally(() => setSaveProgress(false));
	};

	return (
		<Box>
			<Dialog open={saveProgress || saveStatus.status !== 'none'}>
				{saveProgress ? (
					<CircularProgress
						style={{
							margin: '20px'
						}}
					/>
				) : (
					''
				)}
				{saveStatus.status !== 'none' ? (
					<>
						<DialogTitle>{saveStatus.status}</DialogTitle>
						<DialogContent>{saveStatus.message}</DialogContent>
					</>
				) : (
					''
				)}
				<DialogActions>
					<Button
						onClick={() => {
							setSaveProgress(false);
							setSaveStatus({ status: 'none' });
						}}
					>
						{t('add.close')}
					</Button>
				</DialogActions>
			</Dialog>
			<Typography variant="h3">{t('add.add')}</Typography>
			<Grid container sx={{ mt: 3 }} spacing={2} rowSpacing={1}>
				<Grid item md={8}>
					<Typography variant="h5" sx={{ mb: 2 }}>
						{t('add.detail')}
					</Typography>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item md={6}>
							<TextField fullWidth label={t('add.name')} {...appNameProps} />
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label={t('add.author')}
								{...appAuthorProps}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField fullWidth label={t('add.doc')} {...appDocsUrlProps} />
						</Grid>
						<Grid item md={6}>
							<TextField fullWidth label={t('add.web')} {...appWebUrlProps} />
						</Grid>
						<Grid item md={12}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								{t('add.tax')}
							</Typography>
							<TextField
								fullWidth
								label={t('add.category')}
								{...appCategoriesProps}
							/>
						</Grid>
						<Grid item md={12}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								{t('add.meta')}
							</Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={featured}
										onChange={useCallback(
											(e: ChangeEvent<HTMLInputElement>) =>
												setFeatured(e.target.checked),
											[]
										)}
									/>
								}
								label={t('add.featured')}
							/>
							{featured ? (
								<TextField
									fullWidth
									multiline
									label={t('add.featuredText')}
									{...appFeaturedTextProps}
								/>
							) : (
								''
							)}
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={4}>
					<img src={objectURL || upload} width="100%" alt="app logo" />
					<input
						accept="image/*"
						style={{ display: 'none' }}
						id="raised-button-file"
						multiple
						type="file"
						onChange={useCallback((e: ChangeEvent<HTMLInputElement>) => {
							if (e?.target?.files) {
								setImg(e.target.files[0]);
							}
						}, [])}
					/>
					<label htmlFor="raised-button-file">
						<Button variant="contained" component="span">
							{t('add.upload')}
						</Button>
					</label>
					{objectURL ? (
						<Button
							variant="contained"
							component="span"
							color="error"
							sx={{ ml: 2 }}
							onClick={() => setImg(undefined)}
						>
							{t('add.remove')}
						</Button>
					) : (
						''
					)}
				</Grid>

				<Grid item md={4} />
				<Grid item md={12}>
					<TextField
						fullWidth
						label={t('add.description')}
						multiline
						{...appDescriptonProps}
					/>
				</Grid>
				<Grid item md={12}>
					<TextField
						fullWidth
						label={t('add.connection')}
						multiline
						{...appAdditionalInfoProps}
					/>
				</Grid>
				<Grid item md={12}>
					<Button variant="contained" component="span" onClick={handleSave}>
						{t('add.save')}
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddApp;
