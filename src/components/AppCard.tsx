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

const AppCard: FC<App> = ({ name, description, tags, image }) => {
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
				height="190"
				image={image}
				alt="green iguana"
				sx={{ objectFit: 'contain' }}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{descriptionShort}
					<Typography variant="body2" sx={{ mt: 1 }}>
						{tags.slice(0, 2).map((tag, index) => (
							<Chip
								sx={{ mr: 1 }}
								key={index}
								label={tag}
								size="small"
								variant="outlined"
							/>
						))}
					</Typography>
				</Typography>
			</CardContent>

			<div>
				<CardActions>
					<Button
						variant="contained"
						fullWidth
						component={Link}
						to={`/apps/${name}`}
					>
						{t('app.more')}
					</Button>
				</CardActions>
			</div>
		</Card>
	);
};
export default AppCard;
