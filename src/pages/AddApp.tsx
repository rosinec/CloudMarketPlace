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
	DialogTitle,
	Chip,
	Input,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	InputLabel,
	FormControl
} from '@mui/material';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Timestamp } from '@firebase/firestore';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import upload from '../utils/upload_placeholder.png';
import useField from '../hooks/useField';
import { addApp, uploadImage } from '../utils/firebase';
import { useCategory } from '../hooks/useCategory';

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
	const [appCategories, setAppCategories] = useState<string[]>([]);
	const [tags, ,] = useCategory();

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
	const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value }
		} = event;
		setAppCategories(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

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
			tags: appCategories,
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
						<Grid item md={6}>
							<Typography variant="h5" sx={{ mb: 2 }}>
								{t('add.tax')}
							</Typography>
							{/* <TextField
								fullWidth
								label={t('add.category')}
								{...appCategoriesProps}
							/> */}
							<FormControl sx={{ mt: 1 }} fullWidth>
								<InputLabel id="tags-checkbox-label" required>
									{t('drawer.tags')}
								</InputLabel>
								<Select
									labelId="tags-checkbox-label"
									id="tags-checkbox"
									multiple
									variant="standard"
									label={t('drawer.tags')}
									value={appCategories}
									onChange={handleCategoryChange}
									input={<Input sx={{ p: '10px' }} />}
									renderValue={selected => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5
											}}
										>
											{selected.map(value => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
								>
									{tags.map(tag => (
										<MenuItem key={tag.name} value={tag.name}>
											<Checkbox
												checked={appCategories.indexOf(tag.name) > -1}
											/>
											<ListItemText primary={tag.name} secondary={tag.title} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
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
