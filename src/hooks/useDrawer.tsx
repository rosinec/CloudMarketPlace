import { createContext, FC, useContext, useState } from 'react';

export const DrawerContext = createContext<[boolean, () => void]>(
	undefined as never
);

export const DrawerProvider: FC = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(true);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	return (
		<DrawerContext.Provider value={[mobileOpen, handleDrawerToggle]}>
			{children}
		</DrawerContext.Provider>
	);
};

export const useDrawer = () => useContext(DrawerContext);
