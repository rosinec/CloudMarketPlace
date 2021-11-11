import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import { signIn, signUp } from '../utils/firebase';

const Login = () => {
	usePageTitle('Login');

	const { push } = useHistory();
	const t = useTranslation();

	const [isSignUp, setSignUp] = useState(false);

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					isSignUp
						? await signUp(email, password)
						: await signIn(email, password);
					push('/');
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? t('error.unknown')
					);
				}
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				{t('login.signIn')}
			</Typography>
			<TextField label={t('login.email')} {...usernameProps} type="email" />
			<TextField
				label={t('login.password')}
				{...passwordProps}
				type="password"
			/>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="caption"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				<Button
					type="submit"
					variant="outlined"
					onClick={() => setSignUp(true)}
				>
					{t('login.signUp')}
				</Button>
				<Button type="submit" variant="contained">
					{t('login.signIn')}
				</Button>
			</Box>
		</Paper>
	);
};

export default Login;
