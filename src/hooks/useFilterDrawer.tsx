import { createContext, FC, useContext, useState } from 'react';

export const FilterDrawerContext = createContext<[boolean, () => void]>(
	undefined as never
);

export const FilterDrawerProvider: FC = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	return (
		<FilterDrawerContext.Provider value={[mobileOpen, handleDrawerToggle]}>
			{children}
		</FilterDrawerContext.Provider>
	);
};

export const useFilterDrawer = () => useContext(FilterDrawerContext);
