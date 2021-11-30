import { createContext, Dispatch, FC, useContext, useState } from 'react';

import { App } from '../utils/firebase';

export const FilterDrawerContext = createContext<
	[boolean, () => void, App[], Dispatch<React.SetStateAction<App[]>>]
>(undefined as never);

export const FilterDrawerProvider: FC = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [filteredApps, setFilteredApps] = useState<App[]>([]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<FilterDrawerContext.Provider
			value={[mobileOpen, handleDrawerToggle, filteredApps, setFilteredApps]}
		>
			{children}
		</FilterDrawerContext.Provider>
	);
};

export const useFilterDrawer = () => useContext(FilterDrawerContext);
