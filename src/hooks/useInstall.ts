import { setDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';

import { InstalledApp, usersDocument } from '../utils/firebase';

import { useAppByName } from './useApps';
import { useLoggedInUser } from './useLoggedInUser';

const useInstall = (name: string) => {
	const user = useLoggedInUser();

	const [loading, setLoading] = useState<boolean>(false);
	const app = useAppByName(name);

	const fetch = async (apps: InstalledApp[]) => {
		await setDoc(usersDocument(user?.email ?? 'null'), {
			isAdmin: user?.isAdmin ?? false,
			installedApps: apps
		});
		setLoading(false);
	};

	const handleInstall = async () => {
		setLoading(true);
		user?.installedApps.push({
			name: app.name,
			installedAt: Timestamp.now()
		});
		await fetch(user?.installedApps ?? []);
	};

	const handleUninstall = async () => {
		setLoading(true);
		const filtered =
			user && user?.installedApps.length > 1
				? user?.installedApps.filter(app => app.name !== name)
				: [];
		await fetch(filtered);
	};

	return [handleInstall, handleUninstall, loading] as const;
};

export default useInstall;
