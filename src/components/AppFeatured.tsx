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

const AppFeatured: FC<App> = ({ name, tags, image, featured_desc }) => {
	const t = useTranslation();

	return (
		<>
			<Typography variant="h4">
				Featured in <b>{tags[0]}</b>
			</Typography>
			<Card
				sx={{
					width: '100%',
					height: '300px',
					padding: 5,
					mb: 3,
					display: 'flex',
					flexDirection: 'row',
					alignContent: 'center',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					backgroundImage:
						'linear-gradient(90deg, rgb(242 212 92) 13%, rgba(255,255,255,0.10407913165266103) 100%)'
				}}
			>
				<CardMedia
					component="img"
					image={image}
					alt="green iguana"
					sx={{ objectFit: 'contain', width: 'auto', height: '100%' }}
				/>
				<CardContent>
					<Typography variant="h2">{name}</Typography>
					<Typography variant="h5" color="text.secondary">
						{featured_desc}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						{tags.slice(0, 2).map((tag, index) => (
							<Chip
								sx={{ mt: 1 }}
								key={index}
								label={tag}
								size="small"
								variant="outlined"
							/>
						))}
					</Typography>
				</CardContent>

				<div>
					<CardActions>
						<Button
							variant="contained"
							fullWidth
							component={Link}
							to={`apps/${name}`}
						>
							{t('app.more')}
						</Button>
					</CardActions>
				</div>
			</Card>
		</>
	);
};
export default AppFeatured;
