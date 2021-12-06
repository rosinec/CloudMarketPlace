import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState
} from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getDownloadURL } from '@firebase/storage';

import { App, appImageRef, appsCollection } from '../utils/firebase';

type ThemeState = [App[], Dispatch<SetStateAction<App[]>>, boolean];

export const AppContext = createContext<ThemeState>(undefined as never);

export const AppProvider: FC = ({ children }) => {
	const [apps, setApps] = useState<App[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onSnapshot(appsCollection, async snapshot => {
			const apps: App[] = await Promise.all(
				snapshot.docs.map(async doc => {
					const app = doc.data();
					await getDownloadURL(appImageRef(app.image)).then(url => {
						app.image = url;
					});
					if (app.screenshots) {
						app.screenshots = await Promise.all(
							app.screenshots.map(
								async img =>
									await getDownloadURL(appImageRef(img)).then(url => url)
							)
						);
					}
					return app;
				})
			);
			setApps(apps);
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<AppContext.Provider value={[apps, setApps, loading]}>
			{children}
		</AppContext.Provider>
	);
};

export const useApp = () => useContext(AppContext);

export const useAppsLoading = () => {
	const [, , loading] = useContext(AppContext);
	return loading;
};

export const useAppByName = (name: string) => {
	const [apps] = useContext(AppContext);
	return apps.find(app => app.name === name) ?? apps[0];
};

export const useTags = () => {
	const [apps] = useContext(AppContext);
	return apps.reduce((prev, curr) => {
		curr.tags.forEach(tag => prev.add(tag));
		return prev;
	}, new Set<string>());
};
