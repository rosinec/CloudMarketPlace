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
import { Link } from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';
import { App } from '../utils/firebase';
import { DESCRIPTION_LENGTH } from '../utils/constants';

const AppCard: FC<App> = ({
	name,
	description,
	website,
	documentation,
	tags,
	image
}) => {
	const t = useTranslation();
	const descriptionShort =
		description.length >= DESCRIPTION_LENGTH
			? `${description.substring(0, DESCRIPTION_LENGTH)}...`
			: description;

	return (
		<Card
			sx={{
				maxWidth: 345,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<CardMedia
				component="img"
				height="140"
				image={image}
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

			<div>
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
				<Button
					variant="contained"
					fullWidth
					component={Link}
					to={`apps/${name}`}
				>
					{t('app.more')}
				</Button>
			</div>
		</Card>
	);
};
export default AppCard;
