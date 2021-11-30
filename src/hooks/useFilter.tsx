import { useEffect, useState } from 'react';

import { useApp } from './useApps';
import { useFilterDrawer } from './useFilterDrawer';
import useField from './useField';

const useFilter = () => {
	const [allApps] = useApp();
	const [, , apps, setApps] = useFilterDrawer();
	const [tags, setTags] = useState<string[]>([]);
	const [search, setSearch, searchProps] = useField('search', false);

	useEffect(() => {
		const filteredAppsByTags = allApps.filter(app =>
			appApplyToFilter(app.tags)
		);
		const filteredApps = filteredAppsByTags.filter(app =>
			app.name.toLowerCase().includes(search.toLowerCase())
		);
		setApps(filteredApps);
	}, [search, tags, allApps]);

	const appApplyToFilter = (appTags: string[]) => {
		if (tags.length === 0) {
			return true;
		}
		return tags.some(tag => appTags.indexOf(tag) > -1);
	};

	const resetFilters = () => {
		setTags([]);
		setSearch('');
	};

	const applyNew = () => {
		apps.sort((first, second) => second.added.seconds - first.added.seconds);
		// TODO: this slice is not neccesarry...
		// But it does not propagate apps without slicing (or other change).
		// Also dont know why, but by default, the apps are fetched from db already sorted
		setApps(apps.slice(0));
	};
	return [tags, setTags, searchProps, applyNew, resetFilters] as const;
};

export default useFilter;
