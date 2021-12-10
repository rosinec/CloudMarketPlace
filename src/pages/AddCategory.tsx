import {
	Grid,
	Box,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	CircularProgress,
	DialogTitle
} from '@mui/material';
import { useState } from 'react';

import { useTranslation } from '../hooks/useTranslation';
import usePageTitle from '../hooks/usePageTitle';
import useField from '../hooks/useField';
import { addCategory } from '../utils/firebase';

const AddCategory = () => {
	const t = useTranslation();
	usePageTitle(t('layout.add_app'));

	const [name, , nameProps] = useField('name', true);
	const [title, , titleProps] = useField('title', true);
	const [desc, , descProps] = useField('desc', true);

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
		if (!name) {
			console.log('Error.');
			setSaveStatus({
				status: 'error',
				message: ``
			});
			return;
		}

		const _catId = await addCategory({
			name,
			title,
			description: desc
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
			<Typography variant="h3">{t('cat.add')}</Typography>
			<Grid container sx={{ mt: 3 }} spacing={2} rowSpacing={1}>
				<Grid item md={6}>
					<TextField fullWidth label={t('cat.name')} {...nameProps} />
				</Grid>
				<Grid item md={6}>
					<TextField fullWidth label={t('cat.title')} {...titleProps} />
				</Grid>
				<Grid item md={12}>
					<TextField fullWidth multiline label={t('cat.desc')} {...descProps} />
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

export default AddCategory;
