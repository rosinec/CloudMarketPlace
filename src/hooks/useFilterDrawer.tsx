import { createContext, Dispatch, FC, useContext, useState } from 'react';

export const FilterDrawerContext = createContext<
	[boolean, () => void, string[], Dispatch<React.SetStateAction<string[]>>]
>(undefined as never);

export const FilterDrawerProvider: FC = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [tags, setTags] = useState<string[]>([]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<FilterDrawerContext.Provider
			value={[mobileOpen, handleDrawerToggle, tags, setTags]}
		>
			{children}
		</FilterDrawerContext.Provider>
	);
};

export const useFilterDrawer = () => useContext(FilterDrawerContext);
