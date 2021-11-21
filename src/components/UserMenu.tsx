import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, ListItemIcon, Tooltip } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';

import { signOut } from '../utils/firebase';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { useTranslation } from '../hooks/useTranslation';

const UserMenu = () => {
	const user = useLoggedInUser();
	const t = useTranslation();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Tooltip title={user?.email ?? ''}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleClick}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						'overflow': 'visible',
						'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						'mt': 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={signOut}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					{t('layout.logout')}
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;
