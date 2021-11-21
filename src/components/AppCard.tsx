import { FC } from 'react';
import {
	Button,
	CardMedia,
	Card,
	CardContent,
	Typography,
	CardActions,
	Chip
} from '@mui/material';

import { useTranslation } from '../hooks/useTranslation';
import { App } from '../utils/firebase';
import { DESCRIPTION_LENGTH } from '../utils/constants';

const AppCard: FC<App> = ({
	name,
	description,
	website,
	documentation,
	tags
}) => {
	const t = useTranslation();

	const descriptionShort =
		description.length >= DESCRIPTION_LENGTH
			? `${description.substring(0, DESCRIPTION_LENGTH)}...`
			: description;
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component="img"
				height="140"
				image="https://www.jedishop.cz/_obchody/www.jedishop.cz/prilohy/399/rick-morty-polstarek-logo-45-x-45-cm.jpg.big.jpg"
				alt="green iguana"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
					{tags.slice(0, 2).map((tag, index) => (
						<Chip
							sx={{ ml: 1 }}
							key={index}
							label={tag}
							size="small"
							variant="outlined"
						/>
					))}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{descriptionShort}
				</Typography>
			</CardContent>

			<CardActions>
				<Button size="small" onClick={() => window.open(website, '_blank')}>
					{t('app.web')}
				</Button>
				<Button
					size="small"
					onClick={() => window.open(documentation, '_blank')}
				>
					{t('app.docs')}
				</Button>
			</CardActions>
			<Button variant="contained" fullWidth>
				{t('app.more')}
			</Button>
		</Card>
	);
};
export default AppCard;
