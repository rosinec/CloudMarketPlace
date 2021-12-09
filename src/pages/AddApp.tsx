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
				message: `Error while trying to save data, empty image, name of application or description.`
			});
			return;
		}
		console.log('Saving in progress.');
		const imgId: string = await uploadImage(appName, img)
			.then(a => `${a.ref.fullPath}`)
			.catch(e => {
				setSaveStatus({
					status: 'error',
					message: `Error while trying to save image to cloud storage, see the debug console for more info.`
				});
				console.log(e);
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
					message: `Application successfully stored to databse, it's id: ${a}.`
				});
			})
			.catch(e => {
				setSaveStatus({
					status: 'error',
					message: `Error while trying to save application to databse. See the debug console for more info.`
				});
				console.log(e);
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
						Close
					</Button>
				</DialogActions>
			</Dialog>
			<Typography variant="h3">Add new app</Typography>
			<Grid container sx={{ mt: 3 }} spacing={2} rowSpacing={1}>
				<Grid item md={8}>
					<Typography variant="h5" sx={{ mb: 2 }}>
						App details
					</Typography>
					<Grid container spacing={2} rowSpacing={1}>
						<Grid item md={6}>
							<TextField fullWidth label="Application name" {...appNameProps} />
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label="Author or vendor"
								{...appAuthorProps}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								label="URL to Documentation"
								{...appDocsUrlProps}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField fullWidth label="URL to Website" {...appWebUrlProps} />
						</Grid>
						<Grid item md={12}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								Taxonomy
							</Typography>
							<TextField
								fullWidth
								label="App categories"
								{...appCategoriesProps}
							/>
						</Grid>
						<Grid item md={12}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								Metadata
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
								label="Featured app"
							/>
							{featured ? (
								<TextField
									fullWidth
									multiline
									label="Featured text"
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
							Upload
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
							Remove
						</Button>
					) : (
						''
					)}
				</Grid>

				<Grid item md={4} />
				<Grid item md={12}>
					<TextField
						fullWidth
						label="Application description"
						multiline
						{...appDescriptonProps}
					/>
				</Grid>
				<Grid item md={12}>
					<TextField
						fullWidth
						label="Connection info"
						multiline
						{...appAdditionalInfoProps}
					/>
				</Grid>
				<Grid item md={12}>
					<Button variant="contained" component="span" onClick={handleSave}>
						Save new app
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AddApp;
